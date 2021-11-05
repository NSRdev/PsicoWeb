exports.up = function(knex) {
  return knex.schema
      .createTable('users', (table) => {
          table.increments('id');
          table.string('email', 32).notNullable().unique();
          table.string('password', 32).notNullable();
          table.string('name', 32).notNullable();
          table.string('lastname', 64).notNullable();
          table.string('phone', 9);
          table.boolean('blocked').notNullable().defaultTo(false);
          table.boolean('deleted').notNullable().defaultTo(false);
          table.boolean('premium').notNullable().defaultTo(false);
          table.boolean('admin').notNullable().defaultTo(false);
          table.timestamps(true, true);
      })
      .createTable('publications', (table) => {
          table.increments('id');
          table.string('title').notNullable();
          table.string('subtitle').notNullable();
          table.string('heading').notNullable();
          table.string('content').notNullable();
          table.integer('user').notNullable();
          table.foreign('user').references('users.id');
          table.boolean('premium').notNullable().defaultTo(false);
          table.boolean('deleted').notNullable().defaultTo(false);
          table.timestamps(true, true);
      })
      .createTable('likes', (table) => {
          table.increments('id');
          table.integer('user').notNullable();
          table.foreign('user').references('users.id');
          table.integer('publication').notNullable();
          table.foreign('publication').references('publications.id');
          table.boolean('deleted').notNullable().defaultTo(false);
          table.timestamps(true, true);
      })
      .createTable('comments', (table) => {
          table.increments('id');
          table.text('comment').notNullable();
          table.integer('user').notNullable();
          table.foreign('user').references('users.id');
          table.integer('publication').notNullable();
          table.foreign('publication').references('publications.id');
          table.boolean('deleted').notNullable().defaultTo(false);
          table.timestamps(true, true);
      });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable('users')
      .dropTable('publications')
      .dropTable('likes')
      .dropTable('comments');
};
