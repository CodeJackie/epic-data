const Image = require('../models/Image')
const Story = require('../models/Story')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql')


//Image Type

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        id: { type: GraphQLID },
        imgUrl: { type: GraphQLString },
        imgTitle: { type: GraphQLString },
        imgAlt: { type: GraphQLString }
    })
})

const StoryType = new GraphQLObjectType({
    name: 'Story',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        date: { type: GraphQLString },
        image: {
            type: ImageType,
            resolve(parent, args) {
                return Image.findById(parent, imgId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        images: {
            type: new GraphQLList(ImageType), 
            resolve(parent, args) {
                return Image.find()
            }
        },
        image: {
            type: ImageType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args) {
                return Image.findById(args.id)
            }
        },
        stories: {
            type: new GraphQLList(StoryType), 
            resolve(parent, args) {
                return Story.find()
            }
        },
        story: {
            type: StoryType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args) {
                return Story.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})