<template>
  <div>
    <div
      v-for="s in sections"
      :key="s.id"
    >
      <h3 v-if="s.nom">
        {{ s.nom }}
      </h3>

      <EditSectionElement
        v-for="e in s.elements"
        :key="e.id"
        :contenu.sync="contenu[s.id]"
        :element="e"
        :modification="modification"
      />
    </div>
  </div>
</template>

<script>
import EditSectionElement from './edit-section-element.vue'
export default {
  components: {
    EditSectionElement
  },

  props: {
    sections: {
      type: Array,
      default: () => []
    },
    element: {
      type: Object,
      default: () => ({})
    },
    modification: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      contenu: {}
    }
  },

  computed: {
    // masque les sections vides lors de la prévisualistation
    sectionsFiltered() {
      return this.sections.filter(
        s =>
          this.modification ||
          s.elements.some(e => {
            const contenu = this.contenu[s.id][e.id]

            return (!!contenu || contenu === 0) && !e.optionnel
          })
      )
    },

    completed() {
      return this.sections.reduce(
        (completed, s) =>
          s.elements.reduce((sectionCompleted, e) => {
            const value =
              this.contenu[s.id] &&
              (e.type === 'checkboxes'
                ? this.contenu[s.id][e.id].length || null
                : this.contenu[s.id][e.id])

            return sectionCompleted && !!(value || value === 0 || e.optionnel)
          }, completed),
        true
      )
    }
  },

  watch: {
    contenu: {
      handler: function(c) {
        this.element.contenu =
          this.sections &&
          this.sections.reduce((contenu, section) => {
            if (Object.keys(c[section.id]).length) {
              if (!contenu) {
                contenu = {}
              }
              contenu[section.id] = c[section.id]
            }

            return contenu
          }, null)
      },
      deep: true
    },

    completed: function(completed) {
      this.$emit('completed:update', completed)
    }
  },

  created() {
    this.contenu =
      this.sections &&
      this.sections.reduce((contenu, section) => {
        if (section) {
          contenu[section.id] =
            (this.element.contenu && this.element.contenu[section.id]) || {}
        }

        return contenu
      }, {})
  }
}
</script>
