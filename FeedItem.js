



'use strict';
import React, { Component } from 'react';

class FeedItem{
	

	constructor(){
        this._id = "";
        // this.title = "";
        // this.author = {
        //     id: '',
        //     avatar: '',
        //     status:'',
        // };
        // this.description = "";
        // this._created = "";
        // this._deleted = "";
        // this._updated = "";
    }

    setId(val){
        this._id = val;
    }


    convertFeed(_feed){
        var feedItem = new FeedItem();
        feedItem.setId (_feed.id)
      
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