'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Blogs', [
      {
        authorId: '1',
        title: "Postgres is Cool!",
        image: "/img/coding.jpg",
        content: "Vestibulum aliquet tempor dui, quis porta elit venenatis vel. Fusce ullamcorper purus a nisl interdum, quis porttitor ligula laoreet.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: '1',
        title: "Javascript is Awesome!",
        image: "/img/my-img.jpg",
        content: "Aenean posuere ligula velit, nec lobortis lorem molestie pretium. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse sagittis lectus quis volutpat faucibus. Proin ornare arcu sed libero semper, id ornare odio imperdiet.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: '2',
        title: "Bootstrap as CSS Tools",
        image: "/img/blog-img.png",
        content: "Nam auctor, mauris vel posuere vestibulum, dolor dolor mollis nisi, ac maximus lorem ante vel urna. Integer a lectus eu elit auctor laoreet. Nullam in eros vulputate, varius purus id, dignissim risus. Vivamus lacinia lectus quam, ut luctus ex tempor in.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Blogs', null, {});
  }
};
