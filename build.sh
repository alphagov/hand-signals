#! /bin/bash

npm run build

rm hand-signals.zip
rm hand-signals-firefox.zip

zip -r -FS hand-signals.zip extension

cp -R extension extension-ff

#sed -i s/chrome-extension/moz-extension/g extension-ff/dist/app.js
#sed -i s/npkagcojnlkccpdcgokfijkbhmlkglnl/e265fdce-0092-49e7-aaf9-52b74d5d3e5f/g extension-ff/dist/app.js
sed -i '/externally_connectable/,+2d' extension-ff/manifest.json

cd  extension-ff

zip -r -FS hand-signals-firefox.zip *

mv hand-signals-firefox.zip ../

cd ../

rm -r extension-ff

