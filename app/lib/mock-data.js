// Mock bins for demo
export const getMockBins = () => [
  {
    id: '1',
    location: { longitude: -73.9857, latitude: 40.7484 },
    bin_type: 'Recyclable',
    coastal: false,
    image_url: 'https://picsum.photos/200',
  },
  {
    id: '2',
    location: { longitude: -73.986, latitude: 40.749 },
    bin_type: 'General Waste',
    coastal: false,
    image_url: 'https://picsum.photos/201',
  },
];

// Mock tasks for demo
export const getMockTasks = () => [
  { id: 't1', name: 'Photo Trash Bin', reward: 50, target: 1 },
  { id: 't2', name: 'Clean Coastal Bin', reward: 100, target: 3 },
];