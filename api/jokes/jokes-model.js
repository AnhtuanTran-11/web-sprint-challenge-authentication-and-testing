const db = require('../../data/dbConfig')

function find() {
    return db("users").select("id", "username", "password");
  }
  
  /**
    resolves to an ARRAY with all users that match the filter condition
   */
  function findBy(filter) {
    return db("users").where(filter);
  }
  
  /**
    resolves to the user { user_id, username } with the given user_id
   */
  function findById(id) {
    return db("users")
      .select("id", "username", "password")
      .where("id", id)
      .first();
  }
  
  /**
    resolves to the newly inserted user { user_id, username }
   */
  async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
  }
  
  // Don't forget to add these to the `exports` object so they can be required in other modules
  module.exports = {
    find,
    findBy,
    findById,
    add,
  };