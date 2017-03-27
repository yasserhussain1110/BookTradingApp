const {seedUsers, seedBooks, seedTradeRequests} = require('../seed/seed');

const userOneId = seedUsers[0]._id;

const moreBooks = [{
  title: "Famous Five",
  description: "Enid Blyton's short story collection",
  thumbnailURL: "https://books.google.co.in/books/content?id=O7hKVtVZ6g4C&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE710eTaOfJU1wJOhtZpOAqem8mCrMSzYxc52ZySRSk5SU6hw5lp0AMu5GzcaU5fQMl1tzUZSI7S3nt59NqfXUTMWwnxI2N56e4ryB0jFccLUHh0Qv3355dgrkD18NL5hDG7JLmVH",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Structure and Interpretation of Computer Programs",
  description: "Awesome book by Abelson & Sussman",
  thumbnailURL: "https://books.google.co.in/books/content?id=6QOXQgAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE704Sr1BRcsHvSPJXvuZafC_8aQpdvCF3ScvCkiD5kO0U-8cin2agNoh-GJP9b4Qp-j5p5jqGY6iQGNZs4PhHfp98HGFK8Y5FgMXwC0zsu1bpUMMx6qozj-6QKNbmSUY34fkjY1o",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Crime and Punishment",
  description: "Book by Fyodor Dostoyevsky",
  thumbnailURL: "https://books.google.co.in/books/content?id=NdHOjwEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE716k2ca9Vn9HqoE_oc8u41gR6xKMpsSrfsmlVqRbUlpeutE6cMR-uEFqloTXkrBaHZLfPAeH1IXzXqlwo9nYzsgEP2e82J3ooY95dM5GT4oowyLiKZyPWmaC8ybMqh50R1k6YVk",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Into the Wild",
  description: "Jon Krakauer",
  thumbnailURL: "https://books.google.co.in/books/content?id=iI79W-URQTIC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE735qBSy4Ei5Ua96aPoGVnotQKK8YrE-p1Lzn8dxEVa7qT9wMOCgVVp8wirNrkXnFOqRkbsdSHc_Dac7h_8RgmAiPbp5MuidTXuqDmMLKcd57ViNfE6AoF6pSyP8wJLgySz3PD3m",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Brave New World",
  description: "Book by Aldous Huxley",
  thumbnailURL: "https://books.google.co.in/books/content?id=WEhYZ9Pz2osC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70OymWqivyZdJ_bW4Oz78c9NZKzHAKuVVqkVFfClbSB17XB0JRZGggllBaLEszSO6SQ3xZ0tMqo6sni9JkS3o0ZK4psqLWj-wAOc0tiZ3btxUo3VgFBBmdhBgVL_See-k31G_bd",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Crusades A History",
  description: "Book by Jonathan Simon Christopher",
  thumbnailURL: "https://books.google.co.in/books/content?id=eDTaOZxvkqAC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE721E6j4Iu3eF0sylgfq_FMEH_Afh86vaItPJvTEOxiHCkYEp1YGACDrAm_tiobJhKpVlWkBxeJo8RKGpg71zFqPACsvIjRYV0fAyESRDQGQE6zb9_OgTaHAhf4RkfTbHjKfNX3M",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "The Mythical Man Month",
  description: "By Frederick P. Brooks Jr.",
  thumbnailURL: "https://books.google.co.in/books/content?id=Yq35BY5Fk3gC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE718d2Is9mHa5sP-e53nrSrbYdzTtaGJpLE95PwzWefF6y4vfWQvazwItWnUN1Jfcu0OAjl9H672qZMD0j7U0RmEgQprF9x7W2GjJHZ60kXDvSOoy5gCiUqNjDFrZr62LfiVK-dS",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Incoherence of the Philosophers",
  description: "AL Ghazali",
  thumbnailURL: "https://books.google.co.in/books/content?id=Xs67RA3Fv_MC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71lPUPtb5Yvnv83SQ9JB4JMsoxo7_ejtOn9qzP4ygEozPAQcU8h87S044BkmHPWW9IUmEY_cALhbAuRguyzY-gD0CVn9qKxb8fZsRH6AECSphLA1KT_eD4cStKRYrsVX-82EOb-",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "A History of Western Philosophy",
  description: "Book by Bertrand Russell",
  thumbnailURL: "https://books.google.co.in/books/content?id=iQZ6Xk9VdtAC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE738RIS-jY5fxwq0BmZoTM_fd-kBU1ejCl_g7uP9fue0EKckfx5NKdO7NMoJ-jIZkfsP5R7vnKd6NMecSQc1n_3c10eRLGzTInzW8dfnYhmz662ZStDIwrbwqwerAq2Zxq-oxcEg",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Esperanza Rising",
  description: "By Pam Munoz Ryan",
  thumbnailURL: "https://books.google.co.in/books/content?id=Ly6KPrawvqIC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70AnriFyA8US9Nzxu78-Ni6Td_gn0J93wNernDr7aEWrWqFsoAmificmM-cKyRXBsxQKg5RmTWfobPXtppuc8NdLTmj0gvnNhe4vk6FcoS4zxewUA0YJCxqdCmIAem89KqPQrL8",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "A Dance with Dragons",
  description: "George RR Martin's awesome GOT books",
  thumbnailURL: "https://books.google.co.in/books/content?id=kT4_uAAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72vY_r6CsYzCMREpwxd45iBIWfdKFm-V1F8Xu4QvIePsfFjeNaVEL6tf-MyxS-Mcf-E7u3l5-V_KArLtm-cfNIkmB_HCHau806wibK4JjuVsG6FYFQ9YSpJ331D8SlGP5HBKwWD",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Quidditch Through the Ages",
  description: "Hogwarts course book",
  thumbnailURL: "https://books.google.co.in/books/content?id=6QOXQgAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE704Sr1BRcsHvSPJXvuZafC_8aQpdvCF3ScvCkiD5kO0U-8cin2agNoh-GJP9b4Qp-j5p5jqGY6iQGNZs4PhHfp98HGFK8Y5FgMXwC0zsu1bpUMMx6qozj-6QKNbmSUY34fkjY1o",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "Blood in the Arena: The Spectacle of Roman Power",
  description: "By Alison Futrell",
  thumbnailURL: "https://books.google.co.in/books/content?id=VRG1m8LjUloC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73i7w78syf7sffz-aK-C1eox5b4n06tjmXKJaLzEBNgwf7tw7co_Qg8dc51bi6sxEOuEOhpIFuU5PL7Klf4a_EnzyzMrgM2WxbxThA-pGqRIIUWRpCFQ3gU-bGEnGB6uG-Oxrt3",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  title: "The Lord of the Rings",
  description: "JRR Tolkien's fantasy book",
  thumbnailURL: "https://books.google.co.in/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71JbaU6qDzCqVWzyznNL9JKhOHpFiH2I-NVU-Yzc2dNm0Iyxjr2RrOq335NQtfv4vXh80lIp4HnQQMjmDbLwS5Km9y2QheT4OX9tKrQy79l0gni9UwZ8umzAw1Q4Cbzzf94zkl3",
  _ownedBy: userOneId,
  _addedBy: userOneId
}];

const allBooks = seedBooks.concat(moreBooks);

module.exports = {
  users: seedUsers,
  books: allBooks,
  tradeRequests: seedTradeRequests
};
