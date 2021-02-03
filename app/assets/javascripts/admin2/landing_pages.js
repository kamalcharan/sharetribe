function initFooter() {

    $("#remove-footerLink-cancel").click(function(){
        $(".remove-footerLink-content").hide(0);
        $("#new-footerLink-trigger").show(0);
    });

    $(document).on('click', '#new-footerLink-trigger', function(event) {
        var time = new Date().getTime(),
            regexp = new RegExp($(this).data('id'), 'g'),
            templateId = $(this).data('templateId'),
            entry = $($(templateId).html().replace(regexp, time));
        $('#footerlinks').append(entry);
        return event.preventDefault();
    });

    $(document).on('click', '.remove-footerLink-trigger', function(event) {

        var container = $(this).closest('.footer-link-group'),
            isNew = container.data('new');

        $(".remove-footerLink-content").show(200);

        // container.find('.destroy-record').val('1');
        // if (isNew) {
        //     container.remove();
        // } else {
        //     container.hide();
        // }

        return event.preventDefault();
    });

    if ($('#footerlinks').length) {
        Sortable.create(footerlinks, {
            handle: '.handle-move',
            animation: 250,
            onEnd: function (/**Event*/evt) {
                $('.sort-priority').each(function (index) {
                    $(this).val(index);
                });
            }
        });
    }
}

function checkedLandingPage(){
    var back_image = $('#info1ColBackgroundImageWrapper'),
        back_color = $('#info1ColBackgroundColorWrapper'),
        url = $('#info1ColCTALabelURLWrapper'),
        hero_btn = $('#heroCTAButtonLabelURLWrapper'),
        def_text = $('.default-text-label'),
        btn_text_label = $('#buttonTextLabel'),
        def_url = $('#heroCTADefaultTextWrapper');

    back_image.hide();
    back_color.hide();
    hero_btn.hide();
    url.hide();

    if ($('#section_cta_enabled').prop('checked')) {
        url.show();
    }
    if ($('#section_background_style_color').prop('checked')) {
        back_color.show();
    }
    if ($('#section_background_style_image').prop('checked')) {
        back_image.show();
    }
    if ($('#section_cta_button_type_default').prop('checked')) {
        hero_btn.show();
        def_text.show();
        btn_text_label.hide();
        def_url.hide();
    }
    if ($('#section_cta_button_type_button').prop('checked')) {
        hero_btn.show();
        def_text.hide();
        btn_text_label.show();
        def_url.show();
    }
}
function initLandingPage(){
    $("#section_background_color_string").spectrum({
        showInput: true,
        preferredFormat: "hex",
        showPalette: true,
        showSelectionPalette: false,
        palette: [["#FFF", "#000", "#FF4E36", "#15778E", "#ff5a5f"]]
    });
    checkedLandingPage();
    initFooter();
    $("form.section-form").validate();

}
$(function() {

    $(document).on('click', '.remove-landing-page', function () {
        var caption = $(this).data('caption'),
            url = $(this).data('url');
        $('#delete-landing-page-form').attr('action', url);
        $('#landingPageDeleteModalTitle').html(caption);
        $('#landingPageDeleteModal').modal('show');
    });

    $('#landingPageAddModal').on('show.bs.modal', function (e) {
        $('#section_kind').val('');
    });

    $(document).on('change', '.landing-page-section', function () {
        checkedLandingPage();
    });

    $('#section_kind').on('change', function(){
        var url = $(this).data('url'),
            id = $(this).val(),
            option = $(this).find('option:selected'),
            variation = option.data('variation'),
            multi_columns = option.data('multi-columns');

        $.get(url, {section: {kind: id, variation: variation, multi_columns: multi_columns}}, null, 'script');
    });

    if ($('#landingSection').length) {
        Sortable.create(landingSection, {
            handle: '.handle-move',
            animation: 250,
            onMove: function (/**Event*/evt, originalEvent) {
                if ($(evt.related).hasClass('allow_edit_false')) {
                    return false;
                }
            },
            onEnd: function (/**Event*/evt) {
                $('.top_bar_link_position').each(function (index) {
                    $(this).find('.sort_priority_class').val(index);
                });
                $('#simpleList').closest('form').find('button').prop('disabled', false);
            }
        });
    }
});
