import {  storage } from "@/global";
import sweetAlert from "@/server/functions/messages.js";
import { usePageStore } from "@/store/page";

export default {

  data: function () {
    return {
      dialog: false,
      endpoint: '',
      errors: [],
      mode: "save",
      form: {},
      registers: [],
      url: '',
      titleModal: 'ADICIONAR',
      titlePage: '',
      dateStart: "2010-01-01",
      dateFinish: "",
      /** register for pagination */
      // page: 1,
      // currentP: 1,
      // nextitlePage: 1,
      // count: 0,
      // limit: 0,
      // paginate: 0,
      // total: 0,
      /** pesquisa */
      searching: false,
      fieldSearch: "",
      fieldDtsSearch: "",
      fieldDtfSearch: "",
      storage: `${this.$config.public.storage}`,
      folderStorage: "",
    };
  },

  computed: {
    page: function () {
      const paginate = usePageStore();
      return paginate.current;
    },
  },

  methods: {
    submitFS() {
      this.searching = true;
      this.fieldSearch = document.getElementById('fieldSF').value;
      this.page = 1;
      this.loadregisters();
    },

    loadregisters() {
      alert('loadAction');
      this.setCloseModal();





      if (this.searching == true) {
        let q = this.fieldSearch;
        let dts = this.fieldDtsSearch;
        let dtf = this.fieldDtfSearch;
        var search = typeof q === "undefined" || q == "" ? "" : "q=" + q;
        this.url = `${this.$config.public.baseURL}/${this.endpoint}?${search}&page=${this.page}`;
      } else {
        this.url = `${this.$config.public.baseURL}/${this.endpoint}?page=${this.page}`;
      }

      // headers: {
      //   "Content-Type": "application/json",
      // },
      // method: "POST",

      useFetch(this.url).then(res => {
        this.registers = res.data._rawValue.data

        var paginate = usePageStore();
        paginate.$patch({
          last: res.data._rawValue.last_page,
          total: res.data._rawValue.total,
        });


      }).catch(e => {
        sweetAlert(e.response.status, e.response.data.errors);
        this.errors = e.response.data.errors;
      }).finally(
        // this.$store.dispatch("load/SET_LOADING", false)
      );
    },

    async save() {

      // Authorization: `token ${useGithubCookie().value}`;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // headers: {
      //   Authorization: `token ${useGithubCookie().value}`,
      // };


      const method = this.form.uuid ? "put" : "post";
      const uuid = this.form.uuid ? `/${this.form.uuid}` : "";

      if (method == "put") {
        useFetch(
          `${this.$config.public.baseURL}/${this.endpoint}${uuid}`,
          { method: 'PUT', body: this.form }
        ).then((r) => {
          sweetAlert(r.status, 'Registro Alterado!');
          this.reset();
        }).catch(e => {
          if (e.response.status != 422) {
            sweetAlert(e.response.status, e.response.data.errors);
          }
          this.errors = e.response.data.errors;
        })
      } else {
        useFetch(
          `${this.$config.public.baseURL}/${this.endpoint}${uuid}`,
          { method: 'POST', body: this.form }
        ).then((r) => {
          sweetAlert(r.status, 'Registro Inserido!');
          this.reset();
        }).catch(e => {
          if (e.response.status != 422) {
            sweetAlert(e.response.status, e.response.data.errors);
          }
          this.errors = e.response.data.errors;
        })
      }
    },

    remove(item) {

      this.$swal({
        title: `Deseja remover?`,
        text: "Esta ação irá remover o registro da lista.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#ff6a00",
        cancelButtonColor: "#ffceab",
        confirmButtonText: "Remover",
        cancelButtonText: "Manter registro",
        showCloseButton: true
      }).then(result => {
        const uuid = item.uuid;
        if (result.value) {
          useFetch(`${this.$config.public.baseURL}/${this.endpoint}/${uuid}`, { method: 'DELETE' }).then((r) => {
            this.searching = false;
            this.loadregisters();
            sweetAlert(r.status, 'Registro Excluído!');
          }).catch(error => {
            sweetAlert(e.response.status, e.response.data.errors);
            this.errors = e.response.data.errors;
          });

        } else {
          // this.$store.dispatch("selectedItem/SET_ITEM", null);
          this.$swal({
            icon: 'warning',
            title: 'Registro mantido.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    },


    loadRegisterSelect(item) {

      const uuid = item.uuid;
      var titleEdititleModal;
      this.url = `${this.$config.public.baseURL}/${this.endpoint}/${uuid}/details`;
      // this.$store.dispatch("selectedItem/SET_ITEM", item);

      useFetch(this.url).then(res => {
        this.form = res.data._rawValue;
        if ((typeof res.data._rawValue.name != "undefined") && (res.data._rawValue.name != "")) {
          titleEdititleModal = res.data._rawValue.name;
        } else if ((typeof res.data._rawValue.title != "undefined") && (res.data._rawValue.title != "")) {
          titleEdititleModal = res.data._rawValue.title;
        } else if ((typeof res.data._rawValue.slug != "undefined") && (res.data._rawValue.slug != "")) {
          titleEdititleModal = res.data._rawValue.slug;
        } else {
          titleEdititleModal = this.titlePage;
        }
        this.titleModal = titleEdititleModal;
      }).catch(e => {
        sweetAlert(e.response.status, e.response.data.errors);
        this.errors = e.response.data.errors;
      });
    },

    reset() {
      this.searching = false;
      this.titleModal = "CADASTRAR " + this.titlePage;
      this.form = {};
      this.setCloseModal();
      this.loadregisters();
      // this.$store.dispatch("load/SET_LOADING", false);
    },

    setOpenModal() {
      this.eraseErrors();
      // this.$store.dispatch("modal/SET_MODAL", true);
      this.dialog = true;
    },

    setCloseModal() {
      // this.$store.dispatch("selectedItem/SET_ITEM", null);
      // this.$store.dispatch("modal/SET_MODAL", false);
      this.dialog = false;
    },

    eraseErrors() {
      this.errors = [];
    },


  },


  mounted() {
    if (this.endpoint != '') {
      this.loadregisters();
      var dateNow = new Date();
      var year = dateNow.getFullYear();
      var month = dateNow.getMonth() + 1;
      var day = dateNow.getDate();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      this.dateFinish = year + "-" + month + "-" + day;
    }

    var paginate = usePageStore();
    // const pagination = paginate;
    paginate.$patch({
      current: 1,
      last: 1,
      total: null,
    });
  },

}
