// https://intoli.com/blog/transcoding-on-aws-lambda/
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const request = require('request');
const tempy = require('tempy');

const s3 = new AWS.S3();



//
// invokes ffmpeg
const callFfmpeg = (inputFilename, mp3Filename) => {
    const ffmpeg = path.resolve(__dirname, 'exodus', 'bin', 'ffmpeg');

    // convert input to output
    const ffmpegArgs = [
      '-i', inputFilename,
      '-vn', // disable video
      '-acodec', 'libmp3lame',  // use Lame for mp3 encoding
      '-ac', '2', // set 2 audio channels
      '-q:a', '6', // set quality to near 128 kb/s
      '-y', mp3Filename
    ];
    console.log("ffmpeg args:", ffmpegArgs);

    //const process = child_process.spawnSync(ffmpeg, ffmpegArgs);
    //const process = child_process.spawn(ffmpeg, ffmpegArgs, {
    //  detached: true
    //});
    const myproc = child_process.spawn(ffmpeg, ffmpegArgs);
    //const myproc = child_process.spawn("ls", [ "-l", "exodus/bin/ffmpeg" ]);
    myproc.stdout.on('data', (chunk) => {
      console.log("proc:out:"+ chunk);
    });
    myproc.stderr.on('data', (chunk) => {
      console.log("proc:err:"+ chunk);
    });
    myproc.on('message', (message, sendHandle) => {
      console.log("message:", message);
    });
    myproc.on('error', (err) => {
      console.log("error:", err);
    });
    myproc.on('exit', (code, signal) => {
      console.log("exit:", code, signal);
    });
    myproc.on('close', (code, signal) => {
      console.log("close:", code, signal);
    });

    console.log("spawned proc:", myproc.pid);
    return new Promise((resolve,reject) => {
      myproc.on('exit', (code, signal) => {resolve(code); });
    });

}





// requires mp3Key and url in request
//   mp3Key - place to store the saved file
//   url - source input to transcode

exports.handler = (event, context, callback) => {
  console.log("begin");

  // work asynch, make immediate callback down the chain
  callback();

  // extract event params
  const { mp3Key, url } = event;
  const filename = event.filename || path.basename(mp3Key);
  const logKey = event.logKey || `${mp3Key}.log`;
  const s3Bucket = event.s3Bucket || 'defaultsBucket';

  // create tmp files to work with
  const inputFilename = tempy.file();
  const mp3Filename = tempy.file({ extension: 'mp3' });

  // download sources from the url to memory
  Promise.resolve().then(() => new Promise((resolve, revoke) => { 
	   
    const writeStream = fs.createWriteStream(inputFilename);
    writeStream.on('finish', resolve);
    writeStream.on('error', revoke);
    //writeStream.on('finish', () => { console.log('copied file'); });
    //writeStream.on('error', (err) => {console.error(err); } );
    request(url).pipe(writeStream);

//    return new Promise((resolve,reject) => {
//      writeStream.on('finish', (code, signal) => {resolve(); });
//    });

}))
  // perform the transcoding
.then(() => { 
    console.log("call next step");
    // using the excodus exports supporting ffmpeg
    callFfmpeg(inputFilename, mp3Filename)
    .then(() => {
        console.log("completed call to ffmpeg");
    }, (data) => {   
        console.log("error calling ffmpeg:" + data);
    },
    () => {
	   console.log("call error message");
    });
});
    //console.log("file created:", mp3Filename);
// //   return process.stdout.toString() + process.stderr.toString();
// //  })
  // upload the generated mp3 to S3
// //  .then(logContent => new Promise((resolve, revoke) => {
    console.log("copy the new files up to S3:", s3Bucket, mp3Key);
//    s3.putObject({
//      Body: fs.createReadStream(mp3Filename),
//      Bucket: s3Bucket,
//      Key: mp3Key,
//      ContentDisposition: `attachment; filename="${filename.replace('"', '\'')}"`,
//      ContentType: 'audio/mpeg'
//    }, (error, data) => {
//      if (error) {
//        console.log("error copying mp3 file", error);
//        //revoke(error);
//      } else {
//        console.log("copied mp3 file, now copy logs");
//        // update log of output
//        const logFilename = path.basename(logKey);
//        s3.putObject({
//          Body: logContent,
//          Bucket: s3Bucket,
//          Key: logKey,
//          ContentDisposition: `inline; filename="${logFilename.replace('"', '\'')}"`,
 //         ContentType: 'text/plain'
 ////       }, () => {});
 //     }
 //   });



// //  }))
// //  .catch(console.error)
  // delete the temp files
// //  .then(() => {
    //console.log("delete the mp3 file", inputFilename, mp3Filename);
    //[inputFilename, mp3Filename].forEach((filename) => {
    //  if (fs.existsSync(filename)) {
    //    fs.unlinkSync(filename);
    //  }
    //});
    console.log("delete the file", inputFilename);
    if (fs.existsSync(inputFilename)) {
      fs.unlinkSync(inputFilename);
    }
    console.log("delete the file", mp3Filename);
    if (fs.existsSync(mp3Filename)) {
      fs.unlinkSync(mp3Filename);
    }
    console.log("end the promise");
// //  });
  console.log("end the function");



}
