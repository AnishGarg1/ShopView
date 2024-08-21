// sampleData.js

const records = [
  {
    _id: "6522305248020040",
    admin_graphql_api_id: "gid://shopify/Product/6522305248020040",
    body_html: null,
    created_at: "2018-12-06T13:56:27+00:00",
    handle: "empbgeo",
    id: "6522305248020040",
    image: null,
    images: [],
    options: ["Option 1"],
    product_type: "ThMx",
    published_at: null,
    published_scope: "web",
    status: "active",
    tags: "",
    template_suffix: null,
    title: "empbGEO",
    updated_at: "2018-12-06T13:56:27+00:00",
    variants: ["Variant 1"],
    vendor: "Sqrug",
  },
  {
    _id: "69845937655362638",
    admin_graphql_api_id: "gid://shopify/Product/69845937655362638",
    body_html: null,
    created_at: "2019-04-16T01:46:29+00:00",
    handle: "gswaryi",
    id: "69845937655362638",
    image: null,
    images: [],
    options: ["Option 1"],
    product_type: "vbvu",
    published_at: null,
    published_scope: "web",
    status: "active",
    tags: "",
    template_suffix: null,
    title: "GswAryi",
    updated_at: "2019-04-16T01:46:29+00:00",
    variants: ["Variant 1"],
    vendor: "UKiVe",
  },
  // 98 more records
];

for (let i = 3; i <= 100; i++) {
  const randomId = Math.floor(Math.random() * 100000000000000000);
  records.push({
    _id: `${randomId}`,
    admin_graphql_api_id: `gid://shopify/Product/${randomId}`,
    body_html: null,
    created_at: new Date(
      2018 + Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ).toISOString(),
    handle: `${Math.random().toString(36).substring(7)}`,
    id: `${randomId}`,
    image: null,
    images: [],
    options: [`Option ${Math.floor(Math.random() * 5) + 1}`],
    product_type: `${Math.random().toString(36).substring(7).toUpperCase()}`,
    published_at: null,
    published_scope: "web",
    status: "active",
    tags: "",
    template_suffix: null,
    title: `${Math.random().toString(36).substring(7).toUpperCase()}`,
    updated_at: new Date(
      2018 + Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ).toISOString(),
    variants: [`Variant ${Math.floor(Math.random() * 5) + 1}`],
    vendor: `${Math.random().toString(36).substring(7).toUpperCase()}`,
  });
}

export default records;
