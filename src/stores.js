import { writable } from "svelte/store";

let data = {
  test: {
    name: "test.name",
    password: "test",
    id: 6410742057,
    role: "student",
    group: "engineer",
    year: "2564",
    subjects: [],
    image:
      "https://s.isanook.com/ca/0/ui/279/1396205/s__152616986_1562561122.jpg",
  },
};

let data2 = [
  { name: "subject1", total: 10, register: 0, remaining: 10 },
  { name: "subject2", total: 5, register: 1, remaining: 4 },
];
let data3 = [];


export const accounts = writable(data);
export const islogin = writable(false);
export const mode = writable("");
export const account = writable("");
export const subjects = writable(data2);
export const addsub = writable(data3);
