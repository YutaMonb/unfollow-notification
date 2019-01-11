'use strict';

const twitter = require('twitter');
const fs = require('fs');

var client = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

const targetName = '';
let next = -1;
let params = { screen_name: targetName, cursor: -1, count: 200 };
let follower = [];


async function checkFollower() {

    while (!(next == 0)) {
        params = { screen_name: targetName, cursor: next, count: 200 };
        follower = follower.concat(await getFollower(params));
        console.log(params);
    }

    fs.writeFileSync(`./json/latest.json`, JSON.stringify(follower));

}

async function getFollower(par) {
    return new Promise((resolve) => {
        client.get('followers/list', par, (error, friends, response) => {
            next = friends.next_cursor;
            resolve(friends.users);
        })
    });
}

async function checkRemove() {
    try {
        var previous = JSON.parse(fs.readFileSync('./json/previous.json', 'utf-8'));
        var latest = JSON.parse(fs.readFileSync('./json/latest.json', 'utf-8'));
    } catch (error) {
        console.trace('差分データが無いため終了します。　再度実行してください。');
        process.exit(0);
    }

    console.log(`前のフォロワー: ${Object.keys(previous).length}`);
    console.log(`現在のフォロワー: ${Object.keys(latest).length}`);

    let flag;
    let count = 0;
    for (let p in previous) {
        flag = false;
        for (let l in latest) {
            if (previous[p].id == latest[l].id) {
                flag = true;
            }
        }
        if (!flag) {
            console.log(`https://twitter.com/${previous[p].screen_name}`);
            count++;
        }
    }
    console.log(`finish. total: ${count}`);

}

async function run() {
    fs.renameSync('./json/latest.json', './json/previous.json');
    await checkFollower();
    await checkRemove();
}


run();
