export const projectData = {
  metrics: {
    progress: 68,
    totalCost: 2500000,
    totalElements: 1247,
  },
  floorProgress: [
    { floor: "Ground", progress: 95 },
    { floor: "Floor 1", progress: 82 },
    { floor: "Floor 2", progress: 65 },
    { floor: "Floor 3", progress: 48 },
    { floor: "Floor 4", progress: 25 },
  ],
  materials: [
    { name: "Concrete", value: 35 },
    { name: "Steel", value: 25 },
    { name: "Glass", value: 20 },
    { name: "Wood", value: 12 },
    { name: "Other", value: 8 },
  ],
};

export const mockElements = [
  {
    id: 1,
    type: "Wall",
    material: "Concrete",
    dimensions: "3m x 6m x 0.2m",
    status: "completed",
    cost: 5000,
  },
  {
    id: 2,
    type: "Column",
    material: "Steel",
    dimensions: "0.4m x 0.4m x 3m",
    status: "in-progress",
    cost: 3500,
  },
  {
    id: 3,
    type: "Beam",
    material: "Steel",
    dimensions: "0.3m x 0.5m x 8m",
    status: "completed",
    cost: 4200,
  },
];
