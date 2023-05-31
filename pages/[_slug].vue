<script>
export default {
  async asyncData({ params }) {
    const { uuid } = params
    const token = ''

    try {
      const linkInfo = await this.fetchLinkInfo(token, uuid)

      return {
        linkInfo,
      }
    }
    catch (error) {
      console.error('Erro ao carregar os dados:', error)
      return {
        linkInfo: null,
      }
    }
  },

  data() {
    return {
      linkInfo: null,
    }
  },

  async mounted() {
    const token = ''

    try {
      this.linkInfo = await this.fetchLinkInfo(token, this.$route.params.uuid)
    }
    catch (error) {
      console.error('Erro ao carregar os dados:', error)
      this.linkInfo = null
    }
  },

  methods: {
    async fetchLinkInfo(token, uuid) {
      const endpoint = `/links/${uuid}` // Substitua pelo endpoint correto da API

      const response = await fetch(`${this.$config.public.baseURL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok)
        throw new Error('Falha ao carregar os dados da API')

      const data = await response.json()
      return data
    },
  },
}
</script>

<template>
  <div>
    <div v-if="linkInfo">
      <h1>{{ linkInfo.linkoriginal }}</h1>
      <p>{{ linkInfo.linkshort }}</p>
      <p>{{ linkInfo.identfy }}</p>
    </div>
    <div v-else>
      Carregando...
    </div>
  </div>
</template>

