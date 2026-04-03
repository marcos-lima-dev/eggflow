export function CleanupScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Remove atributos adicionados por extensões
            const html = document.documentElement;
            if (html.hasAttribute('cz-shortcut-listen')) {
              html.removeAttribute('cz-shortcut-listen');
            }
          })();
        `,
      }}
    />
  );
}