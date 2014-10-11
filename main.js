chrome.app.window.current().maximize();

$(document).ready(function() {
  $(".navbar-item").click(function() {
      $(".navbar-item").removeClass("navbar-item-selected");
      $(this).addClass("navbar-item-selected");
      $(".page").hide();
      $("#" + this.id + "Page").show()
  });

  $('#_viewtype2').on('click', function(){
    diffUsingJS(1);
  });

  $('#_viewtype1').on('click', function(){
    diffUsingJS(0);
  });

  $('#beautify').on('click', function(){
    data = $('#beautifyText').val();
    options = { brace_style: "collapse",
                                 break_chained_methods: false,
                                 end_with_newline: false,
                                 indent_char: " ",
                                 indent_scripts: "normal",
                                 indent_size: "4",
                                 jslint_happy: false,
                                 keep_array_indentation: false,
                                 max_preserve_newlines: "5",
                                 preserve_newlines: true,
                                 space_before_conditional: false,
                                 unescape_strings: false,
                                 wrap_line_length: "0" };

    if (looks_like_html(data)) {
      data = html_beautify(data, options);
    } else {
      data = js_beautify(data, options);
    }

    $('#beautifyText').val(data);

    textArea = $('#beautifyText')[0];

    //$('#beautifyText').val('{ brace_style: "collapse",break_chained_methods: false,end_with_newline: false,indent_char: " "}');
    // codeEditor = CodeMirror.fromTextArea(textArea, {
    //                     theme: 'default',
    //                     lineNumbers: true
    //                 });
    //codeEditor.focus();
    //codeEditor.setValue('{ brace_style: "collapse",break_chained_methods: false,end_with_newline: false,indent_char: " "}');
  });

});

function looks_like_html(source) {
    // <foo> - looks like html
    // <!--\nalert('foo!');\n--> - doesn't look like html

    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}

function diffUsingJS(viewType) {
	"use strict";
	var byId = function (id) { return document.getElementById(id); },
		base = difflib.stringAsLines(byId("baseText").value),
		newtxt = difflib.stringAsLines(byId("newText").value),
		sm = new difflib.SequenceMatcher(base, newtxt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = byId("diffoutput"),
		contextSize = byId("contextSize").value;

	diffoutputdiv.innerHTML = "";
	contextSize = contextSize || null;

	diffoutputdiv.appendChild(diffview.buildView({
		baseTextLines: base,
		newTextLines: newtxt,
		opcodes: opcodes,
		baseTextName: "Base Text",
		newTextName: "New Text",
		contextSize: contextSize,
		viewType: viewType
	}));
}

