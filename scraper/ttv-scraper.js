const config = require('../config.json');

const { getSiteHtml } = require('../scraper/scraper');
const cheerio = require('cheerio');
const emote = require('../commands/util/twitch-global');

class twitchScraper {
    async getTwitchEmotes() {
        const twitchHTML = await getSiteHtml(config['twitch-url']);
        const $ = cheerio.load(twitchHTML);
        let emoteRows = this.findCardBody($);
        // let firstRow = emoteRows.children[0];
        let counter = 0;
        for (let row of emoteRows.children) {
            if (row.children) {
                for (let col of row.children) {
                    // if (node.attribs('class') == 'col-md-2') {
                    //     console.log(node);
                    // }
                    // node = col-md-2
                    if (col.attribs && col.children) {
                        for (let el of col.children) {
                            if (el.name == 'center') {
                                // console.log(el.children);
                                if (el.children) {
                                    for (let centerChild of el.children) {
                                        // console.log(elChild);
                                        if (centerChild.children) {
                                            for (let centerChildChild of centerChild.children) {
                                                if (centerChildChild.name == 'img') {
                                                    console.log(centerChildChild.attribs['src']); //gets image of emote                                                     
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }

    async findEmote(emoteName) {
        const twitchHTML = await getSiteHtml(config['twitch-url']);
        const $ = cheerio.load(twitchHTML);
        let emoteRows = this.findCardBody($);
        // let firstRow = emoteRows.children[0];
        let counter = 0;
        for (let row of emoteRows.children) {
            if (row.children) {
                for (let col of row.children) {
                    // if (node.attribs('class') == 'col-md-2') {
                    //     console.log(node);
                    // }
                    // node = col-md-2
                    if (col.attribs && col.children) {
                        for (let el of col.children) {
                            if (el.name == 'center') {
                                // console.log(el.children);
                                if (el.children) {
                                    for (let centerChild of el.children) {
                                        // console.log(elChild);
                                        if (centerChild.children) {
                                            for (let centerChildChild of centerChild.children) {
                                                if (centerChildChild.name == 'img') {
                                                    // console.log(elChildChild.attribs['src']); //gets image of emote 
                                                    // console.log(elChildChild.attribs); //gets image of emote 
                                                    if (emoteName.toLowerCase() === (centerChildChild.attribs['data-regex'].toLowerCase())) {
                                                        return centerChildChild.attribs['src'];
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return 'cannot find emote';

    }
    // should be 37 rows 

    findCardBody($) {
        return $('h3:contains("Global Emotes")').parent().parent().children()['1'];
    }
}

module.exports = new twitchScraper();