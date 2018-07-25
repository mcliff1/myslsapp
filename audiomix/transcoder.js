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
    const METHOD = "callFfmpeg():";
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
    console.log(METHOD + "ffmpeg args:", ffmpegArgs);

    //const process = child_process.spawnSync(ffmpeg, ffmpegArgs);
    //const process = child_process.spawn(ffmpeg, ffmpegArgs, {
    //  detached: true
    //});
    const myproc = child_process.spawn(ffmpeg, ffmpegArgs);
    //const myproc = child_process.spawn("ls", [ "-l", "exodus/bin/ffmpeg" ]);
    myproc.stdout.on('data', (chunk) => {
      console.log(METHOD + "proc:out:"+ chunk);
    });
    myproc.stderr.on('data', (chunk) => {
      console.log(METHOD + "proc:err:"+ chunk);
    });
    myproc.on('message', (message, sendHandle) => {
      console.log(METHOD + "message:", message);
    });
    myproc.on('error', (err) => {
      console.log(METHOD + "error:", err);
    });
    myproc.on('exit', (code, signal) => {
      console.log(METHOD + "exit:", code, signal);
    });
    myproc.on('close', (code, signal) => {
      console.log(METHOD + "close:", code, signal);
    });

    console.log(METHOD + "spawned proc:", myproc.pid);
    return new Promise((resolve,reject) => {
      myproc.on('exit', (code, signal) => {resolve(code); });
    });

}

const parseInput = (partList) => {

	// input is of form:  '/123_foldername/partname.mp3'   
  const timingList = partList.map(key => key.split('/')[0].split('_')[0]);


  const filterPart1 = timingList.map((key,idx) => '[' + idx + ']adelay=' + key + '|' + key + '[out' + idx + '];' ).filter(key => key.split('=')[1].split('|')[0] > 0).join(' ');

  const filterPart2 = timingList.map((key,idx) => '[' + (key == 0 ? '' : 'out') + idx + ']').join('') + 'amix=' + timingList.length;




// does the -i part
  return partList.map(key => '-i ' + key).join(' ') +
		' -filter_complex "' + filterPart1 + filterPart2 +
		'" -c:a libmp3lame -q:a 0 -y output.mp3';

}




//
//ref:
//
//copies a single file to local temp storage, returning the local path
const s3Copy = (bucket, key) => {
  return new Promise((resolve, reject) => {
    const METHOD = "s3Copy():";
    console.log(METHOD + "bucket, key:" + bucket + "," + key);
    //const localFilename = tempy.file({name: key});  - could not write to this
    const localFilename = tempy.file();

    const fileStream = fs.createWriteStream(localFilename);
    const params = { Bucket: bucket, Key: key };
    const s3Stream = s3.getObject(params).createReadStream();

    s3Stream.on('error', reject);
    fileStream.on('error', reject);
    fileStream.on('close', () => resolve(localFilename));
    s3Stream.pipe(fileStream);
  });
}



// ref:
//  https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//
//  returns list of string of the target filenames
const s3CopyAll = (bucket, song, inputList) => {
   return new Promise((resolve, reject) => {


    const METHOD = "s3CopyAll():";
    console.log(METHOD + inputList);

    // prefix the song
    //const s3KeyList = inputList.map(key => song + '/' + key);
    const s3KeyList = inputList;

   console.log(METHOD + s3KeyList);
    
     const promiseList = s3KeyList.map(key => s3Copy(bucket, key));

     Promise.all(promiseList).then(	
         (fileList) => {  
	      console.log(METHOD + "2oogie" + filename); 
	     resolve(fileList);
	 },
	 (error) => { reject(error); }
      );

  }); // end return promise)
}





// requires mp3Key and url in request
//   mp3Key - place to store the saved file
//   url - source input to transcode

exports.handler = (event, context, callback) => {
  console.log("begin");

const testInput = [ '00000_backingtracks/cuban.mp3', '04000_names/mati.mp3', '08000_occasion/birthday.mp3' ];
const pt = parseInput(testInput);

//	console.log("testInput:"+pt);
//
//
  // work async, make immediate callback down the chain
  callback();

  // extract event params
  const { mp3Key, url } = event;
  const filename = event.filename || path.basename(mp3Key);
  const logKey = event.logKey || `${mp3Key}.log`;
  const s3Bucket = event.s3Bucket || 'defaultsBucket';
  const inputList = event.inputList || testInput;
  const sourceBucket = event.sourceBucket || 'songparts';

  // create tmp files to work with
  const inputFilename = tempy.file();
  const mp3Filename = tempy.file({ extension: 'mp3' });



  // download sources from the url to memory
//  Promise.resolve().then(() => new Promise((resolve, revoke) => { 
//
//
//
 //   const writeStream = fs.createWriteStream(inputFilename);
  //  writeStream.on('finish', resolve);
//    writeStream.on('error', revoke);
//    //writeStream.on('finish', () => { console.log('copied file'); });
//    //writeStream.on('error', (err) => {console.error(err); } );
//    request(url).pipe(writeStream);
//
//
//    s3Copy('songparts', testInput);
  s3CopyAll(sourceBucket, 'songparts', inputList)
    //console.log("targetList is " + targetList);

//    return new Promise((resolve,reject) => {
//      writeStream.on('finish', (code, signal) => {resolve(); });
//    });

//}))
  // perform the transcoding
.then(() => { 
    console.log("got songparts call next step");
    // using the excodus exports supporting ffmpeg
    return callFfmpeg(inputFilename, mp3Filename);
 //   .then(() => {
//        console.log("completed call to ffmpeg");
//    }, (data) => {   
//        console.log("error calling ffmpeg:" + data);
//    },
//    () => {
//	   console.log("call error message");
 //   });
//},() => {
//	console.log("s3Copy call was rejected");
})
.then((ffmpgPromise) => { 
  console.log("completed call to ffmpeg");
  console.log("copy the new files up to S3:", s3Bucket, mp3Key);

  s3.putObject({
    Body: fs.createReadStream(mp3Filename),
    Bucket: s3Bucket,
    Key: mp3Key,
    ContentDisposition: `attachment; filename="${filename.replace('\"', '\'')}"`,
    ContentType: 'audio/mpeg'
  }, (error, data) => {
    if (error) {
      console.log("error copying mp3 file", error);
    } else {
      console.log("copied mp3 file, now copy logs");
    }
  });

})
.catch(error => {
    console.log("final:catch:" + error, error);
});



    //console.log("file created:", mp3Filename);
// //   return process.stdout.toString() + process.stderr.toString();
// //  })
  // upload the generated mp3 to S3
// //  .then(logContent => new Promise((resolve, revoke) => {
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
//    console.log("delete the file", inputFilename);
 //   if (fs.existsSync(inputFilename)) {
  //    fs.unlinkSync(inputFilename);
 //   }
//    console.log("delete the file", mp3Filename);
//    if (fs.existsSync(mp3Filename)) {
//      fs.unlinkSync(mp3Filename);
//    }
// //  });


  console.log("end the function");


}
