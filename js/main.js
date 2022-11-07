$(document).ready(function () {

    var searchAjax = function (textValue) {
        // console.log(textValue);

        $.ajax({
            dataType: "json",
            cache: false,
            type: "POST",
            url: "data.php?action=search_callback",
            data: {
                'keyword': textValue
            },
            beforeSend: function (xhr) {
                $('#searchInputIcon').append('<div id="loader" class="spinner-border" role="status">\n' +
                    '  <span class="sr-only">...</span>\n' +
                    '</div>');
            },
            success: function (data) {
                $('#loader').remove();
                $('#multiCollapseOriginalList').html(data);
                console.log(data);
                let countRows = 0;
                countRows = data.length;

                if (countRows) {
                    let rowsContainer = $('#resRowsList');
                    let rowsContainerHtml = '';

                    for (let i = 0; i < countRows; i++) {
                        rowsContainerHtml += '<div style="cursor:pointer;" id="search_full_row_' + i + '" class="card">\n' +
                            '                    <div class="card-body pt-2 pb-2 pl-2 pr-2">\n' +
                            '                        <h5 class="card-title mb-0">' + data[i] + '</h5>\n' +
                            '                    </div>\n' +
                            '                </div>';
                    }

                    rowsContainer.html(rowsContainerHtml);

                    // $("div[id^='search_row_']").each(function (i) {
                    //     $(this).on('click', function (event) {
                    //         event.preventDefault();
                    //         thisInput.val($(this).find('h5').text());
                    //         searchAjax(thisInput);
                    //     });
                    // });
                } else {

                }
            },
            error: function () {
                $('#loader').remove();
            }
        });
    };

    var searchBarInputText = function () {
        $('#searchInput').off('keyup').on('keyup', debounce(function (event) {
            // do the Ajax request
            var thisInput = $(this);
            const inputNameOriginalValue = $(this).val();

            $.ajax({
                dataType: "json",
                cache: false,
                type: "POST",
                url: "data.php?action=search",
                data: {
                    'keyword': inputNameOriginalValue
                },
                beforeSend: function (xhr) {
                    $('#iconSearchSpace').append('<div id="loader" class="spinner-border" role="status">\n' +
                        '  <span class="sr-only">Loading...</span>\n' +
                        '</div>');
                },
                success: function (data) {
                    $('#loader').remove();
                    $('#multiCollapseOriginalList').html(data);
                    console.log(data);
                    let countRows = 0;
                    countRows = data.length;

                    if (countRows) {
                        let rowsContainer = $('#resRowsList');

                        let refreshButton = $('#searchTextRefresh').find('i').first();

                        if (refreshButton.hasClass('fa-chevron-circle-down')) {
                            refreshButton.removeClass('text-danger').addClass('text-success');
                        }

                        if (refreshButton.hasClass('fa-chevron-circle-up')) {
                            refreshButton.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                        }
                        // else {
                        //     refreshButton.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                        //     refreshButton.removeClass('text-danger').addClass('text-success');
                        // }

                        if (!rowsContainer.hasClass('searchResultShow')) {
                            rowsContainer.removeClass('searchResultHide').addClass('searchResultShow');
                        } else {
                            rowsContainer.removeClass('searchResultShow').addClass('searchResultHide');
                        }

                        let rowsContainerHtml = '';

                        for (let i = 0; i < countRows; i++) {
                            rowsContainerHtml += '<div style="cursor:pointer;" id="search_row_' + i + '" class="card">\n' +
                                '                    <div class="card-body pt-2 pb-2 pl-2 pr-2">\n' +
                                '                        <h5 class="card-title mb-0">' + data[i] + '</h5>\n' +
                                '                    </div>\n' +
                                '                </div>';
                        }

                        rowsContainer.html(rowsContainerHtml);

                        $("div[id^='search_row_']").each(function (i) {
                            $(this).on('click', function (event) {
                                event.preventDefault();
                                let textSelect = $(this).find('h5').text();
                                thisInput.val(textSelect);
                                searchAjax(textSelect);
                            });
                        });
                    } else {

                    }
                },
                error: function () {
                    $('#loader').remove();
                }
            });
        }, 500));
    };
    searchBarInputText();

    const clickRefresh = function () {
        $('#searchTextRefresh').on('click', function (event) {
            event.preventDefault();

            let searchResult = $('#resRowsList');
            let refreshButton = $(this).find('i').first();
            // console.log(refreshButton);
            // console.log(refreshButton.attr('class'));

            if (refreshButton.hasClass('fa-chevron-circle-down')) {
                refreshButton.removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
                refreshButton.removeClass('text-success').addClass('text-danger');
            } else {
                refreshButton.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                refreshButton.removeClass('text-danger').addClass('text-success');
            }

            console.log(refreshButton.attr('class'));

            if (!searchResult.hasClass('searchResultShow')) {
                searchResult.removeClass('searchResultHide').addClass('searchResultShow');
            } else {
                searchResult.removeClass('searchResultShow').addClass('searchResultHide');
            }
        });
    };
    clickRefresh();

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
    let backToTopButton = null;
    backToTopButton = document.querySelector(".back-to-top");

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

    if (backToTopButton !== null) {
        backToTopButton.addEventListener("click", function (e) {
            document.body.scrollIntoView({
                behavior: "smooth",
            });
        });
    }
});
// alert();