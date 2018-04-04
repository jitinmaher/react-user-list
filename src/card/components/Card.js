import React, { Component } from 'react';
import ImageUrl from '../../common/images/imageUrls';
import { getAge } from '../../common/utility/helpers';
import { emojiIndex } from 'emoji-mart'
import "../styles/styles.css";

class Card extends Component {
    /**
     * Returns emoji based on like of the user
     * @param {Array} likes likes of the user 
     */
    getEmoji(likes) {
        if(likes.length === 0) {
            return "NA";
        }
        const allLikes = likes.map((like) => {
            const result = emojiIndex.search(like).map((o) => o.native);
            return result.slice(1, 3);
        });
        if(!allLikes[0].length) {
            return likes.join(", ");
        }
        return allLikes;
    }
    /**
     * Renders the user card 
     */
    render() {
        const { user } = this.props;
        const { name, likes, birthday, memberSince, contact } = user;
        const { first, last } = name;
        return (
            <div className="card-wrap">
                <div className="card">
                    <img src={ImageUrl[user.gender]} className="card-img" alt="user profile"/>
                    <div className="detailsCont">
                        <h4>{`${first} ${last}`}</h4>
                        <p>Age: {getAge(birthday)}</p>
                        <p>Expierence: {getAge(memberSince)} years</p>
                        <span>Likes: {this.getEmoji(likes)}</span>
                    </div>
                    <button className="contact" onClick={() => {
                        this.props.contactButtonClicked(contact);
                    }}>Contact</button>
                </div>
            </div>
        );
    }
}

export default Card;