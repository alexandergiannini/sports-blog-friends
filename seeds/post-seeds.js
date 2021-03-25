// Seeded Posts go here
// needs user_id, post_title, post_content;
const { Post } = require('../models');
const postdata = [
  {
    post_title: 'Will the Lakers make a move at the trade deadline?',
    post_content: `General manager and vice president of basketball operations Rob Pelinka will attempt to give the team some help ahead of Thursday's trade deadline, but the Lakers have limited assets and are facing significant financial constraints
    Let's take a look at what LA could realistically do to improve the roster.
So, what about players? Los Angeles could make Kentavious Caldwell-Pope, Montrezl Harrell and/or Talen Horton-Tucker available.
"The piece that [the Lakers] have that they may be willing to move is Kentavious Caldwell-Pope," ESPN's Brian Windhorst said on "The Hoop Collective" podcast. "The piece that teams want is Talen Horton-Tucker, who's a restricted free agent at the end of the year. I don't know whether you cash that in at this point."
    `,
    user_id: 1
  }
]

User.bulkCreate(postData);
module.exports = seedPosts;