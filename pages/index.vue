<script>
import { maxLength, minLength, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import crud from '@/server/actions'

export default {
  mixins: [crud],

  setup() {
    return {
      v$: useVuelidate(),
      b$: useBreakpoints(),
    }
  },

  data() {
    return {
      endpoint: 'links',
      titleModal: 'LINKS',
      titlePage: 'LINKS',
      tableHead: ['LINK ORIGINAL', 'LINK CURTO', 'IDENTIFICADOR'],

      totalClicks: null,
      linkInfo: null,
    }
  },

  validations() {
    return {
      form: {
        linkoriginal: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(120),
        },
        linkshort: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(120),
        },
        identfy: { maxLength: maxLength(255) },
      },
    }
  },

  computed: {
    size() {
      return this.b$.current
    },
  },

  mounted() {
    this.fetchLinks()
  },

  methods: {
    fetchLinks() {
      const endpoint = 'links'
      $fetch(endpoint, {
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          // Processar a resposta e atualizar os dados necessários
          this.registers = response.data

          // Retornar o total de links
          this.totalLinks = response.total
          // Atualizar o total de cliques
          this.totalClicks = this.registers.reduce((total, data) => total + data.quantity, 0)

          const linkId = this.$route.params.id
          if (linkId)
            this.fetchLinkInfo(linkId)
        })
        .catch((error) => {
          console.error('Erro ao carregar os links:', error)
        })
    },

    fetchLinkInfo(linkId) {
      const endpoint = `links/${linkId}`
      $fetch(endpoint, {
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          this.linkInfo = response.data // Armazena as informações do link no data
        })
        .catch((error) => {
          console.error('Erro ao carregar as informações do link:', error)
        })
    },

    /* v$.$reset() */
    functionError() {
      return this.v$.form.$invalid
    },
    vReset() {
      this.form = {}
      this.v$.form.$reset()
    },

    loadTotalClicks() {
      $fetch('/links/total-clicks', {
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          this.totalClicks = response.totalClicks
        })
        .catch((error) => {
          console.error('Erro ao carregar total de cliques:', error)
          this.totalClicks = null // Defina como null ou outro valor apropriado em caso de erro
        })
    },
    registerClick(linkId) {
    // Chamar a API para registrar o clique
      $fetch(`/links/${linkId}`, {
        method: 'GET',
        baseURL: `${this.$config.public.baseURL}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then(() => {
          console.log('Clique registrado!')

          // Após registrar o clique, carregue o total de cliques novamente
          this.loadTotalClicks()
        })
        .catch((error) => {
          console.error('Erro ao registrar clique:', error)
        })
    },

  },
}
</script>

<template>
  <TitlePage :title="titlePage" @clickSubmit="search()" />
  <ButtonAdd @add="(dialog = true), reset()" />
  <div class="flex flex-wrap justify-center p-3">
    <div class="w-full max-w-[1000px] p-2 flex flex-nowrap justify-between">
      <div class="flex text-xs">
        <div>
          <div class="i-carbon:link mr-3" />
        </div>
        <div>
          <p class="font-700 text-lg -mt-2 -mb-2">
            {{ totalLinks }}
          </p>
          <p class="font-300">
            Links
          </p>
        </div>
      </div>

      <div class="flex text-xs">
        <div>
          <div class="i-carbon:view mr-3" />
        </div>
        <div>
          <p class="font-700 text-lg -mt-2 -mb-2">
            249
          </p>
          <p class="font-300">
            Views
          </p>
        </div>
      </div>

      <div class="flex text-xs">
        <div>
          <div class="i-carbon:view mr-3" />
        </div>
        <div>
          <p class="font-700 text-lg -mt-2 -mb-2">
            {{ totalClicks }}
          </p>
          <p class="font-300">
            Clicks
          </p>
        </div>
      </div>

      <div class="flex text-xs">
        <div>
          <div class="i-carbon:view mr-3" />
        </div>
        <div>
          <p class="font-700 text-lg -mt-2 -mb-2">
            21%
          </p>
          <p class="font-300">
            Avg. CTR
          </p>
        </div>
      </div>

      <div class="flex text-xs">
        <div>
          <div class="i-carbon:time mr-3" />
        </div>
        <div>
          <p class="font-700 text-lg -mt-2 -mb-2">
            6.37s
          </p>
          <p class="font-300">
            Avg. Time
          </p>
        </div>
      </div>
    </div>

    <div>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <hr class="custom-divider">
        </v-col>
      </v-row>
    </div>

    <div v-for="data in registers" :key="data.uuid" class="w-full max-w-[1000px] p-2 bg-white rounded flex items-center mb-2">
      <div class="i-carbon:overflow-menu-vertical mr-2" />
      <div class="w-full">
        <p class="font-700">
          <a :href="data.uuid" target="_blank" @click="registerClick(data.uuid)">{{ data.linkoriginal }}</a>
        </p>
        <p class="text-xs text-cyan">
          <a :href="data.uuid" target="_blank" @click="registerClick(data.uuid)">{{ data.linkshort }}</a>
        </p>
      </div>
      <div class="flex w-[160px]">
        <div class="flex text-gray text-sm text-right mr-10">
          {{ data.quantity }}
          <div class="i-carbon:chart-cluster-bar ml-2" />
        </div>
        <div class="flex text-gray-700 text-[12pt] text-right font-600">
          <div
            style="display: inline-flex; align-items: center; cursor: pointer;"
          >
            <a :href="data.uuid" target="_blank" @click="registerClick(data.uuid)">
              <div class="i-carbon:replicate ml-2" />
            </a>
          </div>

          <ButtonEdit @edit="select(endpoint, data), (dialog = true)">
            <v-icon>mdi-pencil</v-icon>
          </ButtonEdit>

          <ButtonDelete @delete="remove(endpoint, data.uuid)">
            <v-icon>mdi-delete</v-icon>
          </ButtonDelete>
        </div>
      </div>
    </div>
  </div>

  <ViewLoadingTable v-if="loading" />
  <ViewTable
    v-else
    :head-t-h="tableHead"
    :page="page"
    :total="total"
    :last="last"
  >
    <template #paginate>
      <v-pagination
        v-model="page"
        color="#84cc16"
        :length="last"
        variant="outlined"
        :total-visible="size = 'xs' ? 5 : 7"
        prev-icon="i-carbon:chevron-left"
        next-icon="i-carbon:chevron-right"
        :size="size == 'xs' ? 'x-small' : 'small'"
      />
    </template>
  </ViewTable>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent z-index="1">
      <ViewModal
        :title="titlePage"
        :loading="loading"
        :error="functionError()"
        @close="(dialog = false), vReset()"
        @save="save(form, (pageSave = 'links'))"
      >
        <template #formulary>
          <v-row>
            <v-col cols="6" sm="6">
              <FormInput
                v-model="form.linkoriginal"
                label="Link Original"
                name-field="linkoriginal"
                :msgvalidate="v$.form.linkoriginal"
                :errordata="errorApi != null ? errorApi.linkoriginal : null"
                @blur="v$.form.linkoriginal.$touch()"
              />
            </v-col>
            <v-col cols="6" sm="6">
              <FormInput
                v-model="form.linkshort"
                label="Link Curto"
                name-field="linkshort"
                :msgvalidate="v$.form.linkshort"
                :errordata="errorApi != null ? errorApi.linkshort : null"
                @blur="v$.form.linkshort.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="12">
              <FormInput
                v-model="form.identfy"
                label="Identificador"
                name-field="identfy"
                :msgvalidate="v$.form.identfy"
                :errordata="errorApi != null ? errorApi.identfy : null"
                @blur="v$.form.identfy.$touch()"
              />
            </v-col>
          </v-row>
        </template>
      </ViewModal>
    </v-dialog>
  </v-layout>
</template>

<style>
.statistic {
  text-align: center;
  padding: 20px;
}

.value {
  font-size: 24px;
  font-weight: bold;
}

.label {
  font-size: 14px;
  color: gray;
}

.custom-divider {
  height: 2px;
  background-color: #070707;
  margin-top: 20px;
  margin-bottom: 20px;
}

.icon-container {
  display: flex;
  align-items: center;
}

.text-container {
  margin-left: 4px; /* Ajuste o espaçamento conforme necessário */
}
</style>
