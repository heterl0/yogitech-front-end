// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;
  const image = {
    cover: (index: number) =>
      `${ASSETS_API}/assets/images/cover/cover_${index + 1}.jpg`,
    avatar: (index: number) =>
      `${ASSETS_API}/assets/images/avatar/avatar_${index + 1}.jpg`,
    travel: (index: number) =>
      `${ASSETS_API}/assets/images/travel/travel_${index + 1}.jpg`,
    company: (index: number) =>
      `${ASSETS_API}/assets/images/company/company_${index + 1}.png`,
    product: (index: number) =>
      `${ASSETS_API}/assets/images/m_product/product_${index + 1}.jpg`,
    portrait: (index: number) =>
      `${ASSETS_API}/assets/images/portrait/portrait_${index + 1}.jpg`,
  };
  const user = {
    id: "8864c717-587d-472a-929a-8e5f298024da-0",
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    password: "demo1234",
    photoURL: image.avatar(24),
    phoneNumber: "+40 777666555",
    country: "United States",
    address: "90210 Broadway Blvd",
    state: "California",
    city: "San Francisco",
    zipCode: "94116",
    about:
      "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
    role: "admin",
    isPublic: true,
  };

  return { user };
}
