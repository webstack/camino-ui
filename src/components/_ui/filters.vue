<template>
  <Accordion
    ref="accordion"
    :opened="opened"
    :sub="false"
    class="mb-s"
    @close="close"
    @toggle="toggle"
  >
    <template slot="title">
      {{ title }}
    </template>

    <div class="px-m">
      <div class="tablet-blobs mt">
        <div
          v-if="inputs.length"
          class="tablet-blob-1-2 large-blob-1-3"
        >
          <FiltersInput
            v-for="filter in inputs"
            :key="filter.id"
            :filter.sync="filter"
          />
          <button
            class="btn-border h5 px-s p-xs rnd-xs mb"
            @click="inputsErase"
          >
            Tout effacer
          </button>
        </div>

        <FiltersCheckboxes
          v-for="filter in checkboxes"
          :key="filter.id"
          :filter.sync="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />

        <FiltersSelects
          v-for="filter in selects"
          :key="filter.id"
          :filter.sync="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />

        <Component
          :is="filter.component"
          v-for="filter in customs"
          :key="filter.id"
          :filter.sync="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />
      </div>

      <button
        ref="button"
        class="btn-flash p-s rnd-xs full-x mb"
        @click="validate"
      >
        {{ button }}
      </button>
    </div>
  </Accordion>
</template>

<script>
import Accordion from './accordion.vue'
import FiltersInput from './filters-input.vue'
import FiltersCheckboxes from './filters-checkboxes.vue'
import FiltersSelects from './filters-selects.vue'

export default {
  components: {
    Accordion,
    FiltersInput,
    FiltersCheckboxes,
    FiltersSelects
  },

  props: {
    filters: { type: Array, default: () => [] },
    title: { type: String, default: 'Filters' },
    button: { type: String, default: 'Ok' },
    opened: { type: Boolean, default: false }
  },

  computed: {
    inputs() {
      return this.filters.filter(({ type }) => type === 'input')
    },

    checkboxes() {
      return this.filters.filter(({ type }) => type === 'checkboxes')
    },

    selects() {
      return this.filters.filter(({ type }) => type === 'select')
    },

    customs() {
      return this.filters.filter(({ type }) => type === 'custom')
    }
  },

  methods: {
    inputsErase() {
      this.inputs.forEach(filter => {
        filter.value = ''
      })
    },

    validate() {
      this.$emit('validate')
    },

    close() {
      if (this.$refs.button) {
        this.$refs.button.focus()
      }

      this.$emit('close')
    },

    toggle() {
      this.$emit('toggle')
    },

    filtersReduce(filters, type) {
      return Object.keys(filters).reduce(
        (res, id) =>
          filters[id].type === type
            ? Object.assign(res, { [id]: filters[id] })
            : res,
        {}
      )
    }
  }
}
</script>
