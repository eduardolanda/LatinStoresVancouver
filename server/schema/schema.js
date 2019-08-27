const graphql = require("graphql");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");
const Item = require("../models/item");
const Review = require("../models/review");
const Store = require("../models/store");
const Type = require("../models/type");
const mongoose = require("mongoose");

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
        // return _.filter(items, { storeId: parent.id });
        return Item.find({ storeId: parent.id });
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        // return _.filter(reviews, { itemStoreId: parent.id });
        return Review.find({ itemStoreId: parent.id });
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
        // return _.find(stores, { id: parent.storeId });
        return Store.findById(parent.storeId);
      }
    },
    type: {
      type: TypeType,
      resolve(parent, args) {
        // return _.find(types, { id: parent.typeId });
        return Type.findById(parent.typeId);
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        // return _.filter(reviews, { itemStoreId: parent.id });
        return Review.find({ itemStoreId: parent.id });
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
        // return _.filter(items, { typeId: parent.id });
        return Item.find({ typeId: parent.id });
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
        // return _.find(items, { id: parent.itemStoreId });
        return Type.findById(parent.itemStoreId);
      }
    },
    store: {
      type: StoreType,
      resolve(parent, args) {
        // return _.find(stores, { id: parent.itemStoreId });
        return Store.findById(parent.itemStoreId);
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
        // return _.find(items, { id: args.id });
        return Item.findById(args.id);
      }
    },
    itemName: {
      type: new GraphQLList(ItemType),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        //Code to get data from db/other source
        // TEST IT
        // return Item.find({ name: { $in: [`${args.name}`] } });
        return Item.find({ name: args.name });
      }
    },
    store: {
      type: StoreType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(stores, { id: args.id });
        return Store.findById(args.id);
      }
    },
    review: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(reviews, { id: args.id });
        return Review.findById(args.id);
      }
    },
    type: {
      type: TypeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(types, { id: args.id });
        return Type.findById(args.id);
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        // return items;
        return Item.find({});
      }
    },
    stores: {
      type: new GraphQLList(StoreType),
      resolve(parent, args) {
        // return stores;
        return Store.find({});
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        // return reviews;
        return Review.find({});
      }
    },
    types: {
      type: new GraphQLList(TypeType),
      resolve(parent, args) {
        // return types;
        return Type.find({});
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
        let item = new Item({
          name: args.name,
          brand: args.brand,
          price: args.price,
          storeId: args.storeId,
          typeId: args.typeId
        });
        return item.save();
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
        let store = new Store({
          name: args.name,
          address: args.address,
          telephone: args.telephone,
          url: args.url
        });
        return store.save();
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
        let review = new Review({
          author: args.author,
          email: args.email,
          description: args.description,
          approved: args.approved,
          itemStoreId: args.itemStoreId
        });
        return review.save();
      }
    },
    addType: {
      type: TypeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let type = new Type({
          name: args.name
        });
        return type.save();
      }
    },
    removeItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // return _.remove(items, { id: args.id });
        // Item.findByIdAndRemove({ _id: args.id });
        return Item.findByIdAndRemove(args.id);
      }
    },
    removeStore: {
      type: StoreType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Store.findByIdAndRemove(args.id);
      }
    },
    removeReview: {
      type: ReviewType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // return _.remove(reviews, { id: args.id });
        return Review.findByIdAndRemove(args.id);
      }
    },
    removeType: {
      type: StoreType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // return _.remove(stores, { _id: args.id });
        return Type.findByIdAndRemove(args.id);
      }
    }
  }
});
//EXPORTING ROOT QUERY
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
