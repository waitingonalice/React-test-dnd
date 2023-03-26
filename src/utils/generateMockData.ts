import { faker } from "@faker-js/faker";

export const users: {
  id: string;
  image: string;
}[] = [];

const createRandomUser = () => ({
  id: faker.datatype.uuid(),
  image: faker.image.avatar(),
  birthdate: faker.date.birthdate(),
  name: faker.name.fullName(),
});

Array.from({ length: 20 }).forEach(() => {
  users.push(createRandomUser());
});
