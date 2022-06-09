import { registerBlockType } from "@wordpress/blocks";
import { SelectControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";

registerBlockType("ftgt-block/custom-post-fetch", {
  apiVersion: 2,
  title: "Select Post",
  icon: "smiley",
  apiVersion: 2,
  attributes: {
    selectOptions: {
      type: "object",
    },
    postData: { type: "object" },
    post_id: { type: "string" },
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const blockProps = useBlockProps();
    useEffect(() => {
      var postsCollection = new wp.api.collections.Posts();
      postsCollection.fetch().done(function (posts) {
        var options = [];
        options.push({ label: "Select Post", value: "0" });
        posts.forEach((post) => {
          options.push({ label: post.title.rendered, value: post.id });
        });

        setAttributes({ selectOptions: options });
      });
    }, []);
    const changePost = (post_id) => {
      setAttributes({ post_id: post_id });

      // POST
      apiFetch({
        path: `post_data/v1/post_detail/${post_id}`,
        method: "GET",
      }).then((res) => {
        setAttributes({ postData: res });
      });
    };
    return (
      <div class="ftgt-block-main-div" {...blockProps}>
        <InspectorControls key="setting">
          <div id="nes-select-controls">
            <SelectControl
              label="Select Post"
              value={
                props.attributes.postData ? props.attributes.postData.id : ""
              }
              options={props.attributes.selectOptions}
              onChange={changePost}
            />
          </div>
        </InspectorControls>
        {attributes.postData ? (
          <div>
            <div class="ftgt-block-box-col">
              <div class="ftgt-block-main-box">
                <h2>{attributes.postData.post_date}</h2>
                <p>
                  {attributes.postData.post_excerpt != ""
                    ? attributes.postData.post_excerpt
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  },
  save: (props) => {
    const { attributes, setAttributes } = props;
    return (
      <div>
        {attributes.postData ? (
          <div class="ftgt-block-main-div">
            <div class="ftgt-block-box-col">
              <div class="ftgt-block-main-box">
                <h2>{attributes.postData.post_date}</h2>
                <p>
                  {attributes.postData.post_excerpt != ""
                    ? attributes.postData.post_excerpt
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  },
});
