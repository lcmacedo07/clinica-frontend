<template>
  <div v-if="editor">
    <div
      class="w-full flex p-2 bg-lime items-center"
      :class="size == 'xs' ? 'flex-wrap' : ''"
    >
      <!-- <div
        class="dropdown h-14 cursor-pointer text-white hover:text-lime-200 pt-4"
      >
        <div class="mx-2 items-center flex">
          Estilos
          <div class="i-carbon:caret-down text-xs mt-1 ml-1" />
        </div>
        <ul
          class="dropdown-content mt-2 absolute hidden pt-3 text-sm w-[200px]"
        >
          <div class="bg-lime-500 text-white py-2 px-3">
            <li
              class="border-b border-white text-xs text-lime-200 uppercase pt-1 pb-2"
            >
              USUÁRIOS
            </li>
          </div>
        </ul>
      </div> -->

      <div
        class="bg-lime-300 flex rounded"
        :class="size == 'xs' ? 'w-full' : ''"
      >
        <div
          class="gerisvaldo"
          @click="bold()"
          :class="{ active: editor.isActive('bold') }"
        >
          <div class="i-carbon:text-bold" />
          <v-tooltip activator="parent" location="bottom"> Negrito </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="italic()"
          :class="{ active: editor.isActive('italic') }"
        >
          <div class="i-carbon:text-italic" />
          <v-tooltip activator="parent" location="bottom"> Itálico </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="strike()"
          :class="{ active: editor.isActive('strike') }"
        >
          <div class="i-carbon:text-strikethrough" />
          <v-tooltip activator="parent" location="bottom"> Trachado </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="quote()"
          :class="{ active: editor.isActive('blockquote') }"
        >
          <div class="i-carbon:quotes" />
          <v-tooltip activator="parent" location="bottom"> Destaque </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="underline()"
          :class="{ active: editor.isActive('underline') }"
        >
          <div class="i-carbon:text-underline" />
          <v-tooltip activator="parent" location="bottom">
            Sublinhar
          </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="superscript()"
          :class="{ active: editor.isActive('subscript') }"
        >
          <div class="i-carbon:text-subscript" />
          <v-tooltip activator="parent" location="bottom">
            Subscrito
          </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="subscript()"
          :class="{ active: editor.isActive('superscript') }"
        >
          <div class="i-carbon:text-superscript" />
          <v-tooltip activator="parent" location="bottom">
            Sobrescrito
          </v-tooltip>
        </div>

        <div class="gerisvaldo" @click="clear()">
          <div class="i-carbon:text-clear-format" />
          <v-tooltip activator="parent" location="bottom">
            Limpar formatação
          </v-tooltip>
        </div>
      </div>

      <div
        class="bg-lime-300 flex rounded"
        :class="size == 'xs' ? 'mt-2 w-full' : 'ml-3'"
      >
        <div
          class="gerisvaldo"
          @click="left()"
          :class="{ active: editor.isActive({ textAlign: 'left' }) }"
        >
          <div class="i-carbon:text-align-left" />
          <v-tooltip activator="parent" location="bottom">
            Alinhar à Esquerda
          </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="center()"
          :class="{ active: editor.isActive({ textAlign: 'center' }) }"
        >
          <div class="i-carbon:text-align-center" />
          <v-tooltip activator="parent" location="bottom">
            Centralizar
          </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="right()"
          :class="{ active: editor.isActive({ textAlign: 'right' }) }"
        >
          <div class="i-carbon:text-align-right" />
          <v-tooltip activator="parent" location="bottom">
            Alinhar à Direita
          </v-tooltip>
        </div>

        <div
          class="gerisvaldo"
          @click="justify()"
          :class="{ active: editor.isActive({ textAlign: 'justify' }) }"
        >
          <div class="i-carbon:text-align-justify" />
          <v-tooltip activator="parent" location="bottom">
            Justificar
          </v-tooltip>
        </div>
      </div>

      <div
        class="bg-lime-100 flex rounded"
        :class="size == 'xs' ? 'mt-2 w-full' : 'ml-3'"
        v-if="exibeTables"
      >
        <span class="gerisvaldo" @click="table()">
          <div class="i-carbon:table" />
          <v-tooltip activator="parent" location="bottom">
            Inserir tabela
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="columnBefore()"
          v-if="editor.can().addColumnBefore()"
        >
          <div class="i-carbon:column" />
          <v-tooltip activator="parent" location="bottom">
            Coluna à Esquerda
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="columnAfter()"
          v-if="editor.can().addColumnAfter()"
        >
          <div class="i-carbon:column-insert" />
          <v-tooltip activator="parent" location="bottom">
            Coluna a Direita
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="columnDelete()"
          v-if="editor.can().deleteColumn()"
        >
          <div class="i-carbon:column-delete" />
          <v-tooltip activator="parent" location="bottom">
            Remover Coluna
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="rowBefore()"
          v-if="editor.can().addRowBefore()"
        >
          <div class="i-carbon:row-collapse" />
          <v-tooltip activator="parent" location="bottom">
            Linha a cima
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="rowAfter()"
          v-if="editor.can().addRowAfter()"
        >
          <div class="i-carbon:row-expand" />
          <v-tooltip activator="parent" location="bottom">
            Linha a baixo
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="rowDelete()"
          v-if="editor.can().deleteRow()"
        >
          <div class="i-carbon:row-delete" />
          <v-tooltip activator="parent" location="bottom">
            Remover linha
          </v-tooltip>
        </span>

        <span
          class="gerisvaldo"
          @click="cellMerge()"
          v-if="editor.can().mergeCells()"
        >
          <div class="i-carbon:table-alias" />
          <v-tooltip activator="parent" location="bottom">
            Mesclar células
          </v-tooltip>
        </span>
      </div>

      <div
        class="bg-lime-100 flex rounded"
        :class="size == 'xs' ? 'mt-2 w-full' : 'ml-3'"
        v-if="exibeMatriz"
      >
        <div class="dropdown gerisvaldo">
          <div class="mx-2 items-center flex">
            <div class="i-carbon:document-preliminary" />
            <span class="text-sm ml-1">Templates</span>
            <div class="i-carbon:caret-down text-xs mt-1 ml-1" />
          </div>

          <ul class="dropdown-content mt-2 -ml-2 absolute hidden w-[200px]">
            <div class="bg-lime-100 py-2 px-2 flex flex-wrap rounded">
              <div @click="insertMask('<b>[#T:NomeDoCampo]</b>')">
                <div class="flex text-sm text-black hover:text-red">
                  <div
                    class="border justify-center items-center mr-2 w-6 h-6 rounded-sm"
                  >
                    <div class="i-carbon:text-footnote mt-1 ml-1" />
                  </div>
                  Caracteres
                </div>
              </div>

              <div
                @click="insertMask('<b>[#N:NomeDoCampo]</b>')"
                class="mt-2 w-full"
              >
                <div class="flex text-sm text-black hover:text-red">
                  <div
                    class="border justify-center items-center mr-2 w-6 h-6 rounded-sm"
                  >
                    <div class="i-carbon:page-number mt-1 ml-1" />
                  </div>
                  Número
                </div>
              </div>

              <div
                @click="insertMask('<b>[#M:NomeDoCampo |***-####]</b>')"
                class="mt-2 w-full"
              >
                <div class="flex text-sm text-black hover:text-red">
                  <div
                    class="border justify-center items-center mr-2 w-6 h-6 rounded-sm"
                  >
                    <div class="i-carbon:text-footnote mt-1 ml-1" />
                  </div>
                  Máscara
                </div>
              </div>

              <div
                @click="insertMask('<b>[#$:NomeDoCampo]</b>')"
                class="mt-2 w-full"
              >
                <div class="flex text-sm text-black hover:text-red">
                  <div
                    class="border justify-center items-center mr-2 w-6 h-6 rounded-sm"
                  >
                    <div class="i-carbon:currency-dollar mt-1 ml-1" />
                  </div>
                  Valores R$
                </div>
              </div>

              <div
                @click="insertMask('<b>[#D:NomeDoCampo]</b>')"
                class="mt-2 w-full"
              >
                <div class="flex text-sm text-black hover:text-red">
                  <div
                    class="border justify-center items-center mr-2 w-6 h-6 rounded-sm"
                  >
                    <div class="i-carbon:calendar mt-1 ml-1" />
                  </div>
                  Data DD/MM/AAAA
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <editor-content
      :editor="editor"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @keyup="$emit('keyup', $event)"
      class="textoeditor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
    };
  },
});

export default {
  components: {
    EditorContent,
    // Underline,
    // Subscript,
    // Superscript,
    // TextAlign,
  },

  props: ["modelValue", "exibespecials", "exibetables", "exibematriz"],
  emits: ["update:modelValue"],

  setup() {
    return {
      b$: useBreakpoints(),
    };
  },

  data() {
    return {
      showControlTable: false,
      editor: null,
    };
  },

  computed: {
    exibeSpecials: function () {
      return this.exibespecials || false;
    },
    exibeTables: function () {
      return this.exibetables || false;
    },
    exibeMatriz: function () {
      return this.exibematriz || false;
    },
    size: function () {
      return this.b$.current;
    },
  },

  methods: {
    clear() {
      this.editor.chain().focus().clearNodes().unsetAllMarks().run();
    },

    bold() {
      this.editor.chain().focus().toggleBold().run();
    },

    italic() {
      this.editor.chain().focus().toggleItalic().run();
    },

    strike() {
      this.editor.chain().focus().toggleStrike().run();
    },

    underline() {
      // this.editor.chain().focus().setUnderline().run();
      // this.editor.commands.setUnderline()
      this.editor.commands.toggleUnderline();
    },

    quote() {
      this.editor.chain().focus().toggleBlockquote().run();
    },

    subscript() {
      this.editor.chain().focus().toggleSubscript().run();
    },

    superscript() {
      this.editor.chain().focus().toggleSuperscript().run();
    },

    left() {
      this.editor.chain().focus().setTextAlign("left").run();
    },

    center() {
      this.editor.chain().focus().setTextAlign("center").run();
    },

    right() {
      this.editor.chain().focus().setTextAlign("right").run();
    },

    justify() {
      this.editor.chain().focus().setTextAlign("justify").run();
    },

    table() {
      this.editor
        .chain()
        .focus()
        .insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        })
        .run();
    },

    columnBefore() {
      this.editor.chain().focus().addColumnBefore().run();
    },

    columnAfter() {
      this.editor.chain().focus().addColumnAfter().run();
    },

    columnDelete() {
      this.editor.chain().focus().deleteColumn().run();
    },

    rowBefore() {
      this.editor.chain().focus().addRowBefore().run();
    },

    rowAfter() {
      this.editor.chain().focus().addRowAfter().run();
    },

    rowDelete() {
      this.editor.chain().focus().deleteRow().run();
    },

    cellMerge() {
      this.editor.chain().focus().mergeCells().run();
    },

    insertMask(mask) {
      this.editor.commands.insertContent(mask);
    },

    addSpecialText(msg) {
      alert(msg);
    },

    addCommands() {
      alert();
      return {
        customCommand:
          (attributes) =>
          ({ chain }) => {
            return chain().insertContent("foo!").insertContent("bar!").run();
          },
      };
    },
  },

  watch: {
    modelValue(modelValue) {
      const isSame = this.editor.getHTML() === modelValue;

      if (isSame) {
        return;
      }
      this.editor.commands.setContent(modelValue, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      content:
        !this.modelValue || this.modelValue == "" || this.modelValue == null
          ? "<p>Insira o texto aqui.</p>"
          : this.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,

        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        CustomTableCell,
      ],
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
        this.$emit('update:modelValue', this.editor.getHTML());
      },
      injectCSS: false,
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  padding: 1rem;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}

/* Table-specific styling */
.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 36px !important;
  min-width: 0px !important;
  padding: 0px 8px !important;
}

.detach {
  color: red;
}

.textoeditor {
  border: 1px solid #eee;
  min-height: 250px;
  padding: 7px;
}

.gerisvaldo {
  margin: 0.02rem;
  padding: 0.375rem;
  cursor: pointer;
}
.gerisvaldo:hover {
  color: red;
}

.macedo {
  margin: 0.02rem;
  background-color: yellow;
  padding: 0.375rem;
  cursor: pointer;
}
.macedo:hover {
  color: pink;
}

.active {
  background-color: #7abd0b;
}
</style>


