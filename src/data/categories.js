
export const categories = [
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Discover gadgets and everyday tech essentials.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
    productCount: 3,
    featured: true,
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    slug: "fashion",
    description: "Everyday styles for your wardrobe.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    productCount: 1,
    featured: true,
  },
  {
    id: "cat-home",
    name: "Home & Living",
    slug: "home",
    description: "Thoughtful details for a comfortable home.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    productCount: 3,
    featured: true,
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Small details that complete your look.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    productCount: 3,
    featured: true,
  },
  {
    id: "cat-footwear",
    name: "Footwear",
    slug: "footwear",
    description: "Find comfortable shoes for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    productCount: 2,
    featured: true,
  },
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    description: "Explore headphones and personal audio.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    productCount: 2,
    featured: false,
  },
];

// Featured categories for the homepage.
export const getFeaturedCategories = () =>
  categories.filter((category) => category.featured);

// Find a category using its slug.
export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug);

// Get all category names.
export const getCategoryNames = () =>
  categories.map((category) => category.name);

export default categories;
