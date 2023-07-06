
function smoothScrollToElement(element) {
    var parent = element.parentNode;
    var parentRect = parent.getBoundingClientRect();
    var elementRect = element.getBoundingClientRect();

    var scrollX = elementRect.left - parentRect.left + parent.scrollLeft - parentRect.width / 2 + elementRect.width / 2;
    var scrollY = elementRect.top - parentRect.top + parent.scrollTop;

    var startScrollX = parent.scrollLeft;
    var startScrollY = parent.scrollTop;

    var scrollStep = 5; // adjust this value to change scrolling speed
    var scrollInterval = 50; // adjust this value to change scrolling smoothness

    var currentStep = 0;
    var totalSteps = Math.ceil(scrollInterval / scrollStep);

    function scrollStepf() {
        currentStep++;
        var easing = 0.5 * (1 - Math.cos((Math.PI * currentStep) / totalSteps));

        var newScrollX = startScrollX + (scrollX - startScrollX) * easing;
        var newScrollY = startScrollY + (scrollY - startScrollY) * easing;

        parent.scrollLeft = newScrollX;
        parent.scrollTop = newScrollY;

        if (currentStep < totalSteps) {
            setTimeout(scrollStepf, scrollStep);
        }
    }

    scrollStepf();
}
