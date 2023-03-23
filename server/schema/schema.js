const Image = require('../models/Image')
const Story = require('../models/Story')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')


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
                return Image.findById(parent.imageId)
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

//Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addImage: {
            type: ImageType,
            args: {
                imgUrl: { type: GraphQLNonNull(GraphQLString) },
                imgTitle: { type: GraphQLNonNull(GraphQLString) },
                imgAlt: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const image = new Image({
                    imgUrl: args.imgUrl,
                    imgTitle: args.imgTitle,
                    imgAlt: args.imgAlt,
                })
            return image.save()
            }
        },
        deleteImage: {
            type: ImageType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Image.findByIdAndRemove(args.id)
            }
        },
        updateImage: {
            type: ImageType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                imgUrl: { type: GraphQLString },
                imgTitle: { type: GraphQLString },
                imgAlt: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Image.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            imgUrl: args.imgUrl,
                            imgTitle: args.imgTitle,
                            imgAlt: args.imgAlt
                        },
                    },
                 {new: true}
                )
            }
        },
        addStory: {
            type: StoryType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLNonNull(GraphQLString) },
                content: { type: GraphQLNonNull(GraphQLString) },
                imageId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const story = new Story({
                    title: args.title,
                    date: args.date,
                    content: args.content,
                    imageId: args.imageId
                })
                return story.save()
            }
        },
        deleteStory: {
            type: StoryType,
            args: { 
            id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Story.findByIdAndRemove(args.id)
            }
        },
        updateStory: {
            type: StoryType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                date: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Story.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            date: args.date,
                            content: args.content
                        },
                    },
                 {new: true}
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})