import { writable } from "svelte/store";

let data = {
  test: {
    name: "test.name",
    password: "test",
    id: 6410742057,
    role: "student",
    group: "engineer",
    year: "2564",
    image:
      "https://s.isanook.com/ca/0/ui/279/1396205/s__152616986_1562561122.jpg",
  },
};

export const accounts = writable(data);
export const islogin = writable(false);
export const mode = writable("");
export const account = writable("");
