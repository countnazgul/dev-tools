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

var options = '';
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


  $('#toCSV').on('click', function(){
    csv = $('#papaParse').val();
    csv = csv.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
    csv = Papa.unparse(csv);
    $('#papaParse').val(csv);
  });

  $('#toJSON').on('click', function(){
    csv = $('#papaParse').val();
    csv = Papa.parse(csv, {header: true});
    csv = JSON.stringify(csv.data);
    csv = js_beautify(csv, options);
    $('#papaParse').val(csv);
  });

  $('#toXML').on('click', function(){
    var x2js = new X2JS();
    jsonObj = $('#json2xml1').val();
    jsonObj = jsonObj.replace(/'/g, '"');
    jsonObj = jsonObj.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
    jsonObj = jsonObj.replace(/(['"])?([a-zA-Z0-9_]+)(['"])? :/g, '"$2": ');
    jsonObj = JSON.parse(jsonObj);
    var xmlAsStr = x2js.json2xml_str( jsonObj );
    xmlAsStr = vkbeautify.xml(xmlAsStr);
    $('#json2xml1').val(xmlAsStr); //
  });

  $('#toJSON1').on('click', function(){
    var x2js = new X2JS();
    jsonObj = $('#json2xml1').val();
    jsonObj = x2js.xml_str2json( jsonObj );
    xmlAsStr = vkbeautify.json(jsonObj);
    $('#json2xml1').val(xmlAsStr); //
  });

  $('#sqlbeautify').on('click', function(){
    sqlText = $('#sqlBeautifier').val();
    sqlText = vkbeautify.sql(sqlText);
    $('#sqlBeautifier').val(sqlText); //
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

