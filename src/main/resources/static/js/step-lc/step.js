layui.define(['jquery', 'carousel', 'laytpl'],exports => {
    let $ = layui.jquery
    let carousel = layui.carousel
    let laytpl = layui.laytpl

    let processTpl = `
        <div id="StepWrapper">
            <div class="s-step">
                {{# layui.each(d.nodes, (index, item) => {}}
                <div class="
                    s-circle
                    {{# if(index === 0) {}}
                    active
                    {{# } }}
                ">
                    <div class="s-num">{{ index + 1 }}</div>
                    <div class="tip">{{ item.tip }}</div>
                </div>
                {{# if(index !== d.nodes.length -1 ) { }}
                <div class="s-line"></div>
                {{# } }}
                {{#  });}}
            </div>
        </div>
    `

    let contentTpl = `
        <div id="StepWrapper_content">
            <div class="layui-carousel" id="Content_Main">
                <div id="Carousel_item" carousel-item></div>
            </div> 
        </div>
    `

    let renderProcess = (dom, nodes) => {
        nodes = nodes || []
        laytpl(processTpl).render({ nodes }, html => {
            $(dom).append(html)
        })
    }

    let renderContent = (dom, contents) => {
        laytpl(contentTpl).render({}, html => {
            $(dom).append(html)
        })

        contents = contents || []
        contents.forEach(item => {
            let tpl = `<div class="item">
                ${item._tpl}
            </div>`
            laytpl(tpl).render(item.ctx, html => {
                $('#Carousel_item').append(html)
            })
        })
    }

    let getCurrent = () => {
        let circles = $('.s-circle')
        let reservIndex = 0
        circles.each((index, item) => {
            if($(item).hasClass('active')) {
                reservIndex = index
            }
        })
        return reservIndex
    }
    
    let updateState = (dir) => {
        let circles = $('.s-circle')
        let reservIndex = getCurrent()
        $(circles[reservIndex]).removeClass('active')
        if(dir === 'prev'){
            $(circles[reservIndex - 1 < 0 ? 2 : reservIndex - 1]).addClass('active')
            $('.layui-carousel-arrow[lay-type=sub]').trigger('click')
        } else {
            $(circles[(reservIndex + 1) % circles.length]).addClass('active')
            $('.layui-carousel-arrow[lay-type=add]').trigger('click')
        }
    }

    let lock = false;
    let updateWidthLock = (dir) => {
        if(lock) {
            return 
        }
        lock = true
        updateState(dir)
        setTimeout(() => lock = false, 300);
    }

    let freshHeight = () => {
        setTimeout(() => {
            let currentItem = $('.item.layui-this')
            let firstChild = currentItem.children(':first')[0]
            $(currentItem).height(firstChild.scrollHeight)
            $('#Carousel_item').height(firstChild.scrollHeight)
            $('#StepWrapper_content').height(firstChild.scrollHeight)
        }, 300)
    }
    
    let prev = () => {
        updateWidthLock('prev')
        freshHeight()
    }
    
    let next = () => {
        updateWidthLock('next')
        freshHeight()
    }

    let run = (options) => {
        renderProcess(options.elem, options.nodes)
        renderContent(options.elem, options.contents)
        setTimeout(()=>{
            carousel.render({
                elem: '#Content_Main',
                width: '100%',
                // height: options.contentHeight || '20rem',
                indicator: 'none',
                autoplay: false
            })
        
            $('.layui-carousel-arrow').css({
                display: 'none'
            })
        
            let stepWidth = options.stepWidth || '16rem'
            let contentWidth = options.contentWidth || '100%'
            let stepCount = options.nodes || []
        
            $('.s-step').width(stepWidth)
            $('#StepWrapper_content').width(contentWidth)
        
            $('.s-step > .s-line').css({
                width: `calc((100% - 1.5rem * ${stepCount.length}) / ${stepCount.length - 1})`
            })
        
            let tips = $('.s-circle > .tip')
            let length = $($('.s-circle')[0]).width() + $($('.s-line')[0]).width()
            tips.each((index, item) => {
                $(item).width(length / 2)
            })
        
            let stepWrapperLength = $('.s-step').width() + length / 2
        
            $('#StepWrapper').width(stepWrapperLength)   

            // $('.prev').each((index, item) => {
            //     $(item).on('click', e => {
            //         updateWidthLock('prev')
            //     })
            // })

            // $('.next').each((index, item) => {
            //     $(item).on('click', e => {
            //         updateWidthLock('next')
            //     })
            // })
        })
    }

    exports('step', {
        run,
        prev,
        next,
        getCurrent,
        freshHeight
    })
})