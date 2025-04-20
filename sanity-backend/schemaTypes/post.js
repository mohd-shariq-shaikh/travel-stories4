export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
      },
      {
        name: 'image_post',
        title: 'Image Post',
          type: "file",
          // asset: {
          //   ref: "image-15183a72c1729d6a000eca5f261dd264ffb15469-1200x960-jpg",
          //   type: "reference"
          // },
        options: {
          hotspot: true,
        },
      },
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'comment' }],
      },
      {
        name: 'topic',
        title: 'Topic',
        type: 'string',
      },
    ],
  };