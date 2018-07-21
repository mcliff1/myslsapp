ffmpeg -i 00_00_backingtracks/cuban.mp3 \
  -i 00_00_prerecorded_vocal/prerecordedvocal.mp3 \
  -i 00_04_names/mati.mp3 \
  -i 00_08_occasion/valentinesday.mp3 \
  -i 00_23_character_1/brilliant.mp3 \
  -i 00_24_character_2/compassionate.mp3 \
  -i 00_26_character_3/charming.mp3 \
  -i 00_28_verb_1/cooking.mp3 \
  -i 00_29_verb_2/pingpong.mp3 \
 -filter_complex "[2]adelay=4000|4000[a];[3]adelay=8000|8000[b];[4]adelay=23000|23000[c];[5]adelay=24000|24000[d];[6]adelay=26000|26000[e];[7]adelay=28000|28000[f];[8]adelay=29000|29000[g];[0][1][a][b][c][d][e][f][g]amix=9" \
  -c:a libmp3lame -q:a 0 \
 -y output.mp3

