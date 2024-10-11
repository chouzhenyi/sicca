<!-- @format -->

<script lang="tsx">
import { defineComponent, h } from "vue";
export default defineComponent({
  name: "SecurityTitle",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { value } = props;
    console.log(value);
    return () => {
      return (
        <>
          <div>123</div>
        </>
      );
    };
  },
});
</script>
