# Play Market Monitoring

#### Before start, install manually `NodeJS` and `MongoDB`for you environment and put it to config.<br />

In config files change database connection link and baseServerUrl of project.<br />
Also you can setup frequency of making screenshots.

To start dev env locally:<br />
`npm run all:install`<br />
`npm run dev`<br />

To build production and start server:<br />
`npm run all:install`<br />
`npm run web:build`<br />
`npm run start`<br />
Open browser with your host and port(if needed)
## How to use
Go to google play market(https://play.google.com) and select some app.</br>

Copy URL and put inside Play Market Monitoring app in input field and press `Add`.

Select some package and click `View` - you will see screenshots with dates.

Click on screenshot to open full size in a new tab.

Your screenshots store in assets/screenshots folder according corresponding package
