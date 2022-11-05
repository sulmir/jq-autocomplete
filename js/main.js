$(document).ready(function () {
    var searchBarInputText = function () {
        $('#orgSearchNameId').off('keyup').on('keyup', debounce(function (event) {
            // do the Ajax request
            const inputNameOriginalValue = $(this).val();
            const bodyAll = $('#bodyAll');
            const criteria = {
                'type': bodyAll.data('sBarType'),
                'order': bodyAll.data('sBarSort')
            };
            // console.log('Was send with criteria ' + criteria.type + +criteria.order);

            $.ajax({
                type: "POST",
                url: "?search=original",
                data: {
                    'keyword': inputNameOriginalValue,
                    'type': criteria.type,
                    'order': criteria.order
                },
                beforeSend: function (xhr) {
                    $('#multiCollapseOriginalList').html('<div class="spinner-border" role="status">\n' +
                        '  <span class="sr-only">Loading...</span>\n' +
                        '</div>');
                },
                success: function (data) {
                    $('#multiCollapseOriginalList').html(data);

                    $("a[id^='remove_original_']").each(function (i) {
                        $(this).on('click', function (event) {
                            event.preventDefault();
                            // if (confirm("Napewno usunąć") == true) {
                            // importMixer('?remove_original=', '#remove_original_', $(this).attr('id').split('_').pop());
                            // }
                        });
                    });
                }
            });
        }, 500));
    };

    function sendRefreshOriginal() {
        const bodyAll = $('#bodyAll');
        var keyword = $('#orgSearchNameId').val();
        keyword = (keyword.length) ? keyword : '';

        $.ajax('?refresh=original', {
            type: 'GET',
            data: {
                'keyword': keyword,
                'type': bodyAll.data('sBarType'),
                'order': bodyAll.data('sBarSort'),
            },
            success: function (data, status, xhr) {
                $('#multiCollapseOriginalList').html(data);

                $("a[id^='remove_original_']").each(function (i) {
                    $(this).on('click', function (event) {
                        event.preventDefault();
                        // if (confirm("Napewno usunąć") == true) {
                        // importMixer('?remove_original=', '#remove_original_', $(this).attr('id').split('_').pop());
                        // }
                    });
                });
            },
            beforeSend: function (xhr) {
                $('#multiCollapseOriginalList').html('<div class="spinner-border" role="status">\n' +
                    '  <span class="sr-only">Loading...</span>\n' +
                    '</div>');
            },
            error: function (jqXhr, textStatus, errorMessage) {
                $('#multiCollapseOriginalList').html(errorMessage);
            }
        });
    }

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    const showOnPx = 100;
    const backToTopButton = document.querySelector(".back-to-top")

    const scrollContainer = () => {
        return document.documentElement || document.body;
    };

    document.addEventListener("scroll", () => {
        if (scrollContainer().scrollTop > showOnPx) {
            backToTopButton.classList.remove("tthidden")
        } else {
            backToTopButton.classList.add("tthidden")
        }
    });

    if (undefined !== backToTopButton) {
        backToTopButton.addEventListener("click", function (e) {
            document.body.scrollIntoView({
                behavior: "smooth",
            });
        });
    }
});
// alert();