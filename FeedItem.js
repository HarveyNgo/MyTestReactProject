
'use strict';
import React, { Component } from 'react';

class FeedItem{
	

	constructor(){
        this.id = "";
        this.created_at = "";
        this.actor = {
            id: '',
            avatar_url: '',
            login:'',
        };
         this.payload ={
         };
         this.repo ={
         };
    }

    setId(val){
        this.id = val;
    }
    setActor(val){
        this.actor=val;
    }

    setCreateAt(val){
        this.created_at=val;
    }

    setPayload(val){
        this.payload=val;
    }
    setRepo(val){
        this.repo=val;
    }

    convertFeed(_feed){
        var feedItem = new FeedItem();
        feedItem.setId (_feed.id)
        feedItem.setActor(_feed.actor)
        feedItem.setCreateAt(_feed.created_at)
        feedItem.setPayload(_feed.payload)
        feedItem.setRepo(_feed.repo)
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