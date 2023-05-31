

import sweetAlert from "@/server/functions/messages.js";
import { url } from "@/global";
import { useSearchStore } from "@/store/search";
import { usePageStore } from "@/store/page";

async function getData(endpoint) {
  // var token = localStorage.getItem(_token);
  const paginate = usePageStore();

  var urlcomplete;

  const searching = useSearchStore();
  var search = searching.sentence;

  if (search == null) {
    urlcomplete = `${this.$config.public.baseURL}/${endpoint}?page=${paginate.current}`;
  } else {
    urlcomplete = `${this.$config.public.baseURL}/${endpoint}?q=${search}&page=${paginate.current}`;
  }

  const registers = await useFetch(`${urlcomplete}`).then(res => {
    if (res.data._rawValue.current_page != paginate.current) {
      paginate.$patch({
        current: res.data._rawValue.current_page,
      });
    }
    if (res.data._rawValue.last_page != paginate.last) {
      paginate.$patch({
        last: res.data._rawValue.last_page,
      });
    }
    if (res.data._rawValue.total != paginate.total) {
      paginate.$patch({
        total: res.data._rawValue.total,
      });
    }

    paginate.$patch({
      registers: res.data._rawValue.data,
    });


    return res.data._rawValue.data;
  }).catch(e => {
    sweetAlert(e.response.status, e.response.data.errors);
    // this.errors = e.response.data.errors;
  }).finally(
    // this.$store.dispatch("load/SET_LOADING", false)
  );

  return registers;

};

export default getData;