import moment from "jalali-moment";

export function convertDatee() {
  const toJalali = (date) => {
    return moment(date).locale("fa").format("jYYYY/jMM/jDD");
  };

  const toIso = (date) =>
    date
      ? moment.from(date, "fa", "jYYYY/jMM/jDD").format("YYYY-MM-DD")
      : "";

  return { toJalali,toIso };
}
