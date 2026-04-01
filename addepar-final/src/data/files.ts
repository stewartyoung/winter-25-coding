const files: any = [
    {
      id: 1,
      name: 'README.md',
    },
    {
      id: 2,
      name: 'Documents',
      children: [
        {
          id: 3,
          name: 'Word.doc',
        },
        {
          id: 4,
          name: 'Powerpoint.ppt',
        },
      ],
    },
    {
      id: 5,
      name: 'Downloads',
      children: [
        {
          id: 6,
          name: 'unnamed.txt',
        },
        {
          id: 7,
          name: 'Misc',
          children: [
            {
              id: 8,
              name: 'foo.txt',
            },
            {
              id: 9,
              name: 'bar.txt',
            },
          ],
        },
      ],
    },
    {
        id: 10,
        name: 'Bin',
        children: [
          {
            id: 11,
            name: 'unnamed.txt',
          },
          {
            id: 12,
            name: 'Misc',
            children: [
              {
                id: 13,
                name: 'foo.txt',
              },
              {
                id: 14,
                name: 'bar.txt',
              },
            ],
          },
        ],
      },
  ];

export default files;