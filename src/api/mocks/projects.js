export default {
  getProjects({ search }) {
    return new Promise((resolve) => {
      const projects = [
        {
          id: 1,
          name: 'Videos for new social media posts',
          ownerName: 'Olofs Tradgard',
          videosAmount: 3,
          date: '2015-03-25T12:00:00Z',
          imageSrc: 'https://via.placeholder.com/40',
          location: {
            city: 'Stockholm',
            country: 'Sweden',
          },
          tags: [
            {
              name: 'Animation',
              id: 1,
            },
            {
              name: 'Product video',
              id: 2,
            },
            {
              name: 'Narrative',
              id: 3,
            },
          ],
        },
        {
          id: 3,
          name: 'Digital animator for 3 inspiring videos\n',
          ownerName: 'Olofs Tradgard',
          videosAmount: 3,
          date: '2015-03-25T12:00:00Z',
          imageSrc: 'https://via.placeholder.com/40',
          location: {
            city: 'Stockholm',
            country: 'Sweden',
          },
          tags: [
            {
              name: 'Animation',
              id: 1,
            },
            {
              name: 'Product video',
              id: 2,
            },
            {
              name: 'Narrative',
              id: 3,
            },
          ],
        },
        {
          id: 5,
          name: 'Animator for Hair Gel Commercial',
          ownerName: 'Olofs Tradgard',
          videosAmount: 3,
          date: '2015-03-25T12:00:00Z',
          imageSrc: 'https://via.placeholder.com/40',
          location: {
            city: 'Stockholm',
            country: 'Sweden',
          },
          tags: [
            {
              name: 'Animation',
              id: 1,
            },
            {
              name: 'Product video',
              id: 2,
            },
            {
              name: 'Narrative',
              id: 3,
            },
          ],
        },
        {
          id: 6,
          name: 'South of south looking for an 5 explainers',
          ownerName: 'Olofs Tradgard',
          videosAmount: 3,
          date: '2015-03-25T12:00:00Z',
          imageSrc: 'https://via.placeholder.com/40',
          location: {
            city: 'Stockholm',
            country: 'Sweden',
          },
          tags: [
            {
              name: 'Animation',
              id: 1,
            },
            {
              name: 'Product video',
              id: 2,
            },
            {
              name: 'Narrative',
              id: 3,
            },
          ],
        },
        {
          id: 2,
          name: 'Narrative video for big client',
          ownerName: 'Olofs Tradgard',
          videosAmount: 3,
          date: '2015-03-25T12:00:00Z',
          imageSrc: 'https://via.placeholder.com/40',
          location: {
            city: 'Stockholm',
            country: 'Sweden',
          },
          tags: [
            {
              name: 'Animation',
              id: 1,
            },
            {
              name: 'Product video',
              id: 2,
            },
            {
              name: 'Narrative',
              id: 3,
            },
          ],
        },
        {
          id: 7,
          name: 'Hiring for educational videos',
          ownerName: 'Olofs Tradgard',
          videosAmount: 3,
          date: '2015-03-25T12:00:00Z',
          imageSrc: 'https://via.placeholder.com/40',
          location: {
            city: 'Stockholm',
            country: 'Sweden',
          },
          tags: [
            {
              name: 'Animation',
              id: 1,
            },
            {
              name: 'Product video',
              id: 2,
            },
            {
              name: 'Narrative',
              id: 3,
            },
          ],
        },
      ];

      const response = {
        data: search
          ? projects.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
          : projects,
      };
      // imitate loading
      setTimeout(() => {
        resolve(response);
      }, 750);
    });
  },
};
