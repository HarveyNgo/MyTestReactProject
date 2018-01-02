
'use strict';
import React, { Component } from 'react';

class FeedItem{
	

	constructor(){
        this.id = "";
        // this.title = "";
        this.actor = {
            id: '',
            avatar_url: '',
            login:'',
        };
        // this.description = "";
        // this._created = "";
        // this._deleted = "";
        // this._updated = "";
    }

    setId(val){
        this.id = val;
    }
    setActor(val){
        this.actor=val;
    }


    convertFeed(_feed){
        var feedItem = new FeedItem();
        feedItem.setId (_feed.id)
       feedItem.setActor(_feed.actor)
        return feedItem;
    }

     convertFeedList(_feeds){
        var feeds = [];
        _feeds.map((_feed) => {
            var feedItem = new FeedItem();
            feedItem = this.convertFeed(_feed);
            feeds.push(feedItem);
        });
        return feeds;
    }
}

module.exports = new FeedItem();