import swal from 'sweetalert2'
import { _token } from '@/global'
import sweetAlert from '@/server/functions/messages.js'
// import { usePageStore } from "@/store/page";

export default {

  setup() {
    return {
      $env: useRuntimeConfig(),
    }
  },

  data() {
    return {
      dialog: false,
      loading: null,
      endpoint: '',
      titlePage: '',
      errors: null,
      errorApi: null,
      mode: 'save',
      form: {},
      registers: null,
      token: null,

      /** register for pagination */
      page: 1,
      total: 0,
      limit: 0,
      last: 1,

      /** pesquisa */
      searching: false,
      fieldSearch: '',
      storage: `${this.$config.public.storage}`,

    }
  },

  methods: {
    search() {
      this.searching = true
      this.fieldSearch = document.getElementById('searchField').value
      this.page = 1
      this.loadregisters()
    },

    loadregisters() {
      this.setInteraction()

      let urlLoad
      let errorsReturn
      this.loading = true

      if (this.searching == true) {
        const q = this.fieldSearch
        const search = typeof q === 'undefined' || q == '' ? '' : `q=${q}`
        urlLoad = `${this.endpoint}?${search}&page=${this.page}`
      }
      else {
        urlLoad = `${this.endpoint}?page=${this.page}`
      }

      $fetch(`${urlLoad}`, {
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        onResponseError({ request, response, error }) {
          errorsReturn = error
        },
      })
        .then((r) => {
          this.registers = r.data
          this.total = r.total
          this.limit = r.per_page
          this.last = r.last_page
        })
        .catch(() => {
          if ((localStorage.getItem('_session') != 'undefined') || localStorage.getItem('_session') == true)
            sweetAlert(500, 'Erro de Conexão')
        })
        .finally(() => {
          this.loading = false
        })
    },

    save(formulary, endpointToSave) {
      this.loading = true
      let errorsReturn = null
      const methodSave = formulary.uuid ? 'PUT' : 'POST'
      const uuid = formulary.uuid ? `/${formulary.uuid}` : ''

      $fetch(`${endpointToSave}${uuid}`, {
        method: methodSave,
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formulary,
        async onResponseError({ request, response, error }) {
          errorsReturn = response._data.errors
        },
      })
        .then((r) => {
          sweetAlert(200, 'Registro Salvo!')
          this.closeDialogs()
          this.reset()
          this.loadregisters()
        })
        .catch(() => {
          this.errorApi = errorsReturn
        })
        .finally(() => {
          this.loading = false
        })
    },

    remove(endpointToRemove, IdOrUuid) {
      new swal({
        title: 'Deseja remover?',
        text: 'Esta ação irá remover o registro da lista.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffceab',
        cancelButtonColor: '#ff6a00',
        cancelButtonText: 'Manter registro',
        confirmButtonText: 'Remover',
        showCloseButton: true,
      }).then((result) => {
        if (result.value) {
          useFetch(`${this.$config.public.baseURL}/${endpointToRemove}/${IdOrUuid}`, {
            method: 'DELETE',
            baseURL: `${this.$config.public.baseURL}`,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
            .then((r) => {
              sweetAlert(200, 'Registro Excluído!')
              this.loadregisters()
            })
            .catch((e) => {
              sweetAlert(500, e.response.data.errors)
            })
        }
        else {
          new swal({
            icon: 'warning',
            title: 'Registro mantido.',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })
    },

    select(endpoint, item) {
      this.setInteraction()

      useFetch(`${endpoint}/${item.uuid}/details`, {
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((r) => {
          this.form = r.data._rawValue
        })
        .catch((e) => {
          sweetAlert(500, e.response.data.errors)
        })
    },

    reset() {
      this.searching = false
      this.form = {}
      this.errors = null
      this.errorApi = null
    },

    closeDialogs() {
      this.dialog = false
    },

    resetRegisters() {
      this.form = {}
      this.errorApi = null
      this.fieldSearch = ''
      this.searching = false
      this.errors = null
      this.errorApi = null
    },

    setInteraction() {
      localStorage.setItem('lastActiveTime', Date.now())
    },

  },

  watch: {
    page() {
      this.loadregisters()
    },
  },

  mounted() {
    const token = localStorage.getItem(_token)
    if (typeof token !== 'undefined' && token !== null)
      this.token = localStorage.getItem(_token).replace(/"/g, '')

    else
      this.$router.push({ name: 'index' })

    this.loadregisters()
  },

}
