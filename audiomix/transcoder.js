// https://intoli.com/blog/transcoding-on-aws-lambda/
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const request = require('request');
const tempy = require('tempy');

const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {

  // work asynch, make immediate callback down the chain
  callback();

  // extract event params
  const { mp3Key, url } = event;
  const filename = event.filename || path.basename(mp3Key);
  const logKey = event.logKey || `${mp3Key}.log`;
  const s3Bucket = event.s3Bucket || 'defaultsBucket';

  // create tmp files to work with
  const inputFilename = tempy.file();
  const mp3Filename = tempy.file({ extention: 'mp3' });

  // download sources from the url to memory
  Promise.resolve().then(() => new Promise((resolve, revoke) => {
    const writeStream = fs.createWriteStream(inputFilename);
    writeStream.on('finish', resolve);
    writeStream.on('error', revoke);
    requrest(url).pipe(writeStream);
  }))
  // perform the transcoding
  .then(() => {
    // using the excodus exports supporting ffmpeg
    const ffmeg = path.resolve(__dirname, 'exodus', 'bin', 'ffmpgeg');

    // convert input to output
    const ffmpegArgs = [
      '-i', inputFilename,
      '-acodec', 'libmp3lame',  // use Lame for mp3 encoding
      '-ac', '2', // set 2 audio channels
      '-q:a', '6', // set quality to near 128 kb/s
      mp3Filename
    ];

    const process = child_process.spawnSync(ffmpeg, ffmpegArgs);
    return process.stdout.toString() + process.stderr.toString();
  })
  // upload the generated mp3 to S3
  .then(logContent => new Promise((resolve, revoke) => {
    s3.putObject({
      Body: fs.createReadStream(mp3Filename),
      Bucket: s3Bucket,
      Key: mp3Key,
      ContentDisposition: `attachment; filename="${filename.replace('"', '\'')}"`,
      ContentType: 'audio/mpeg'
    }, (error) => {
      if (error) {
        revoke(error);
      } else {
        // update log of output
        const logFilename = path.basename(logKey);
        s3.putObject({
          Body: logContent,
          Bucket: s3Bucket,
          Key: logKey,
          ContentDisposition: `inline; filename="${logFilename.replace('"', '\'')}"`,
          ContentType: 'text/plain'
        }, resolve);
      }
    });
  }))
  .catch(console.error)
  // delete the temp files
  .then(() => {
    [inputFilename, mp3Filename].forEach((filename) => {
      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
      }
    });
  });


}
