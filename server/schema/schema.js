const graphql = require("graphql");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat
} = graphql;

//fake db

var stores = [
  {
    name: "Banana Groove",
    address: "2705 E 22nd Ave, Vancouver, BC V5M 3G3",
    telephone: "(604) 435-0646",
    url: "None",
    id: "1"
  },
  {
    name: "Banana Groove 2",
    address: "2705 E 22nd Ave, Vancouver, BC V5M 3G3",
    telephone: "(604) 435-0646",
    url: "www.bananagroove.ca",
    id: "2"
  },
  {
    name: "Banana Groove 3",
    address: "2705 E 22nd Ave, Vancouver, BC V5M 3G3",
    telephone: "(604) 435-0646",
    url: "www.bananagroove.com",
    id: "3"
  }
];

var items = [
  {
    name: "Ricaleta",
    brand: "Marinela",
    price: 2,
    storeId: "1",
    typeId: "1",
    id: "1"
  },
  {
    name: "Paleta Payaso",
    brand: "Ricolino",
    price: 3,
    storeId: "1",
    typeId: "1",
    id: "2"
  },
  {
    name: "Picafresa",
    brand: "Marinela",
    price: 0.5,
    storeId: "2",
    typeId: "1",
    id: "3"
  }
];

var types = [
  { name: "Candy", id: "1" },
  { name: "Drink", id: "2" },
  { name: "Food Can", id: "3" },
  { name: "Fruit", id: "4" },
  { name: "Vegetabke", id: "5" }
];

var reviews = [
  {
    author: "Eduardo Landa",
    email: "eduardo.landa@outlook.com",
    description: "Good",
    approved: true,
    itemStoreId: "1",
    id: "1"
  },
  {
    author: "Eduardo Landa",
    email: "eduardo.landa@outlook.com",
    description: "Good",
    approved: true,
    itemStoreId: "2",
    id: "2"
  },
  {
    author: "Eduardo Landa",
    email: "eduardo.landa@outlook.com",
    description: "Good",
    approved: true,
    itemStoreId: "3",
    id: "3"
  },
  {
    author: "Eduardo Landa",
    email: "eduardo.landa@outlook.com",
    description: "Good",
    approved: true,
    itemStoreId: "3",
    id: "4"
  },
  {
    author: "Eduardo Landa",
    email: "eduardo.landa@outlook.com",
    description: "Good",
    approved: true,
    itemStoreId: "2",
    id: "5"
  },
  {
    author: "Eduardo Landa",
    email: "eduardo.landa@outlook.com",
    description: "Good",
    approved: true,
    itemStoreId: "1",
    id: "6"
  }
];

const StoreType = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    telephone: { type: GraphQLString },
    url: { type: GraphQLString },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return _.filter(items, { storeId: parent.id });
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return _.filter(reviews, { itemStoreId: parent.id });
      }
    }
  })
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    brand: { type: GraphQLString },
    price: { type: GraphQLFloat },
    store: {
      type: StoreType,
      resolve(parent, args) {
        return _.find(stores, { id: parent.storeId });
      }
    },
    type: {
      type: TypeType,
      resolve(parent, args) {
        return _.find(types, { id: parent.typeId });
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return _.filter(reviews, { itemStoreId: parent.id });
      }
    }
  })
});

const TypeType = new GraphQLObjectType({
  name: "Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return _.filter(items, { typeId: parent.id });
      }
    }
  })
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    description: { type: GraphQLString },
    approved: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    item: {
      type: ItemType,
      resolve(parent, args) {
        return _.find(items, { id: parent.itemStoreId });
      }
    },
    store: {
      type: StoreType,
      resolve(parent, args) {
        return _.find(stores, { id: parent.itemStoreId });
      }
    }
  })
});

// ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get data from db/other source
        return _.find(items, { id: args.id });
      }
    },
    store: {
      type: StoreType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(stores, { id: args.id });
      }
    },
    review: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(reviews, { id: args.id });
      }
    },
    type: {
      type: TypeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(types, { id: args.id });
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return items;
      }
    },
    stores: {
      type: new GraphQLList(StoreType),
      resolve(parent, args) {
        return stores;
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return reviews;
      }
    },
    types: {
      type: new GraphQLList(TypeType),
      resolve(parent, args) {
        return types;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        storeId: { type: new GraphQLNonNull(GraphQLID) },
        typeId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let NewItem = {
          name: args.name,
          brand: args.brand,
          price: args.price,
          storeId: args.storeId,
          typeId: args.typeId,
          id: uuidv1()
        };
        items.push(NewItem);
        return NewItem;
      }
    },
    addStore: {
      type: StoreType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        telephone: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newStore = {
          name: args.name,
          address: args.address,
          telephone: args.telephone,
          url: args.url,
          id: uuidv1()
        };
        stores.push(newStore);
        return newStore;
      }
    },
    addReview: {
      type: ReviewType,
      args: {
        author: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        approved: { type: new GraphQLNonNull(GraphQLBoolean) },
        itemStoreId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let newReview = {
          author: args.author,
          email: args.email,
          description: args.description,
          approved: args.approved,
          itemStoreId: args.itemStoreId,
          id: uuidv1()
        };
        reviews.push(newReview);
        return newReview;
      }
    },
    addType: {
      type: TypeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let NewType = {
          name: args.name,
          id: uuidv1()
        };
        types.push(NewType);
        return NewType;
      }
    }
  }
});
//EXPORTING ROOT QUERY
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
