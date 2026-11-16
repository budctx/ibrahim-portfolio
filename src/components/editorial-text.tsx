import React from 'react';
import Markdoc from '@markdoc/markdoc';

/** Render the Markdown subset already supported by Keystatic's installed parser.
 * No executable MDX, custom tags, raw HTML or in-copy images. Media stays in CMS image fields.
 */
export function EditorialText({text}: {text: string}) {
  const tree = Markdoc.parse(text);
  const content = Markdoc.transform(tree, {
    nodes: {
      heading: {render: 'h3', attributes: {level: {type: Number}}},
      image: {transform: () => []},
      link: {
        attributes: {href: {type: String}, title: {type: String}},
        transform(node, config) {
          const {href, title} = node.transformAttributes(config);
          const children = node.transformChildren(config);
          const safe = typeof href === 'string' && /^(https:\/\/|\/(?!\/)|#)/.test(href);
          return safe ? new Markdoc.Tag('a', {href, title}, children) : children;
        },
      },
    },
  });
  return <>{Markdoc.renderers.react(content, React)}</>;
}
