const storeWatcher = new class {
    selectIndex = 0;


    getTabs() {
        return this[this.selectIndex] || (this[this.selectIndex] = cssMethods.createMap(new Map()));
    }

    setStore(store) {
        this.$store = store;
        this.watchSelectIndex(store);
        this.watchShowScreen(store);
        this.watchToolsbar(store);
    }

    watchSelectIndex() {
        this.$store.watch(function (modules) {
            let selectIndex = modules.tableChart.selectIndex;
            return selectIndex;
        }, (n, o) => {
            this.changeSelectIndex(n, o);
        })
    }

    /*监控下拉菜单弹出筛选器*/
    watchShowScreen() {
        // console.log(this.$store.state,this.$store.state.tableChart,'store')

        let dimension = this.$store.state.tableChart.dimension;
        Object.keys(dimension).forEach((idKey) => {
            this.$store.watch((modules) => {
                return dimension[idKey].showAlert;
            }, function (n) {
                eventDispatcher.processingArgumentsClick({id: idKey, type: 'click', module: "m1", options: {show: n}})
            })
        });

        let measure = this.$store.state.tableChart.measure;
        Object.keys(measure).forEach((idKey) => {
            this.$store.watch((modules) => {
                return measure[idKey].showAlert;
            }, function (n) {
                eventDispatcher.processingArgumentsClick({id: idKey, type: 'click', module: "m2", options: {show: n}})
            })
        });

    }

    /*监控工具栏点击选择事件*/
    watchToolsbar(){
        let toolbar = this.$store.state.tableChart.tools.toolbar; //工具栏
        let select = this.$store.state.tableChart.tools.select;  //选择栏
        Object.keys(toolbar).forEach((idKey) => {
            this.$store.watch((modules) => {
                return toolbar[idKey].click;
            }, function (n) {
                eventDispatcher.processingArgumentsTools({id: idKey, type: 'click', module: "m7", options: {show: n}})
            })
        });
        Object.keys(select).forEach((idKey) => {
            this.$store.watch((modules) => {
                return select[idKey].index;
            }, function (n) {
                eventDispatcher.processingArgumentsTools({id: idKey, type: 'select', module: "m7", options: {index: n}})
            })
        });
    }

    /*切换表格*/
    changeSelectIndex(newNumber, oldNumber) {
        let old = this[oldNumber];
        this.selectIndex = newNumber;
        this[newNumber] = this[newNumber] || cssMethods.createMap(new Map());
        cssMethods.changeMapSelectIndex(old || [], this[newNumber]);
        eventDispatcher.setSelectIndex(newNumber);
    }


};

const eventDispatcher = new class {
    eventsArr = [];
    selectIndex = 0;
    vue = null;

    setVue($root) {
        this.$root = $root;
        this.setEmitEvent();
    }

    setSelectIndex(selectIndex) {
        this.selectIndex = selectIndex;
    }

    processingArgumentsDorp(saveInfo, endModule) {
        //第一个操作的对象,唯一性id
        //第二个操作的方式, 拖拽
        //第三个所在的模块
        let post = {id: saveInfo.masterTargetId};
        post.type = saveInfo.re.type;
        post.module = endModule;
        post.options = {};
        this.dispatcher(post)
    }

    processingArgumentsClick({id, type, module, options}) {
        //第一个操作的对象,唯一性id
        //第三个操作的方式，点击
        //第二个所在的模块
        let post = {id, type, module, options};
        this.dispatcher(post)
    }

    processingArgumentsTools({id, type, module, options}) {
        //第一个操作的对象,唯一性id
        //第三个操作的方式，点击
        //第二个所在的模块
        let post = {id, type, module, options};
        this.dispatcher(post)
    }

    setEmitEvent() {
        this.$root.$on("EventDispatcher", (IndexAndCallBack) => {
            let selectIndex = IndexAndCallBack[0];
            this.eventsArr[selectIndex] = IndexAndCallBack[1];
        })
    }

    dispatcher(...arg) {

        let callBack = this.eventsArr[this.selectIndex];
        // console.log(arg, 'arg', this.eventsArr, this.selectIndex, callBack)
        if (callBack) {
            callBack(...arg)
            return null;
        }

        console.log("没有注册事件")
    }
};

class domMethods {
    async set_drop_dimension(e, el) {
        const li = el.parentElement;
        if (!new Array(6).fill(e).some(() => {
            if (e.target.nodeName === "LI") {
                // console.log(e.target.parentElement, 'target')
                e.target.parentElement.insertBefore(li, e.target)
                return true;
            }

            if (e.target.nodeName === "UL") {
                e.target.appendChild(li);
                return true;
            }

            if (e.target.nodeName === "DIV") {
                e.target.querySelector('ul').appendChild(li)
                return true;
            }

            e.target = e.target.parentElement
        })) throw new Error('错误 没有找到插入元素')
    }

    async set_drop_measure(e, el) {
        const li = el.parentElement;
        if (!new Array(6).fill(e).some(() => {
            if (e.target.nodeName === "LI") {
                e.target.parentElement.insertBefore(li, e.target)
                return true;
            }

            if (e.target.nodeName === "UL") {
                e.target.appendChild(li);
                return true;
            }

            if (e.target.nodeName === "DIV") {
                e.target.querySelector('ul').appendChild(li)
                return true;
            }

            e.target = e.target.parentElement
        })) throw new Error('错误 没有找到插入元素')
    }

    async set_drop_toolbar_dom(e, el) {
        const li = domMethods.createTagLi(el, e);
        if (!new Array(7).fill(e).some(() => {
            if (e.target.nodeName === "LI") {
                return !!e.target.parentElement.insertBefore(li, e.target)
            }
            if (e.target.nodeName === "UL") {
                e.target.appendChild(li);
                return true;
            }

            if (e.target.nodeName === "DIV") {
                e.target.querySelector('ul').appendChild(li)
                return true;
            }

            e.target = e.target.parentElement
        })) throw new Error("错误 没有找到插入元素");
    }

    async set_drop_screen_dom(e, el) {
        if (!new Array(3).fill(e).some(() => {

            if (e.target.nodeName === "P") {

                e.target.parentElement.insertBefore(el, e.target);
                return true;
            }

            if (e.target.nodeName === "DIV") {
                let div = e.target.querySelector("div");
                div ? div.appendChild(el) : e.target.appendChild(el);
                return true;
            }
            e.target = e.target.parentElement
        }))
            throw new Error("错误 没有找到插入元素")
    }

    async set_drop_left_screen_tag_dom(e, el) {
        const li = domMethods.createScreen_li_Tag(el, e);
        if (!new Array(3).fill(e).some(() => {
            if (e.target.nodeName === "LI") {
                // console.log(e.target.parentElement, 'target')
                e.target.parentElement.insertBefore(li, e.target)
                return true;
            }

            if (e.target.nodeName === "UL") {
                e.target.appendChild(li);
                return true;
            }

            if (e.target.nodeName === "DIV") {
                e.target.querySelector('ul').appendChild(li)
                return true;
            }

            e.target = e.target.parentElement
        })) throw new Error('错误 没有找到插入元素')
    }


    static deleteTag(oldTarget) {
        oldTarget.parentElement.removeChild(oldTarget);
    }

    static deleteTag_li() {

    }


    static delMethod(element) {
        return function () {
            element.parentElement.removeChild(element);
        }
    }

    static createTagLi(child, response) {
        const li = document.createElement("li");
        li.appendChild(child);
        response.$del = domMethods.delMethod(li);
        return li;
    }

    static createScreen_li_Tag(child, response) {
        let li = document.createElement("li");
        let i = document.createElement("i");
        i.classList.add("el-icon-menu"); //todo 添加class 改变;
        li.appendChild(i);
        li.appendChild(child);
        response.$del = domMethods.delMethod(li);
        return li;
    }

    static createElement_P_Tag(target, response) {
        let p = document.createElement("P");
        p.innerText = target.innerText;
        response.classList = target.querySelector("i") && target.querySelector("i").classList.value;
        response.p = p;

        p.setAttribute('draggable', 'true');
        response.$del = domMethods.delMethod(p);
        return p;
    }

    static createElement_P_Insert_I_tag(target, response) {
        let p = document.createElement("P");
        let i = document.createElement("i");
        p.innerText = target.innerText;
        p.appendChild(i);
        response.classList = target.querySelector("i") && target.querySelector("i").classList.value;
        response.p = p;
        p.setAttribute("draggable", 'true');
        i.classList.add('el-icon-caret-bottom');
        // console.log(response, 'crate-p');
        response.$del = domMethods.delMethod(p);
        return p;
    }

    static saveLeftElementTag(re, srcTarget, copyTarget) {
        //以第一次为准;
        let saveInfo;
        let endModule = re.module; //先保存，后面会改变值;
        let map = storeWatcher.getTabs();


        if (map.get(srcTarget)) {
            saveInfo = map.get(srcTarget);
            let $del = saveInfo.re.$del;
            saveInfo.re.$end.then(() => {
                $del();
            });

            if (saveInfo.masterTarget !== srcTarget) {
                // console.log("重复添加不删除");
                map.delete(srcTarget);
            }


            saveInfo.re.$end.then(() => {
                /*事件调度系统*/
                eventDispatcher.processingArgumentsDorp(saveInfo, endModule);
            });

            if (copyTarget === 'masterTag') {
                map.delete(saveInfo.masterTarget);
                return saveInfo.masterTarget;
            }

            map.set(copyTarget, Object.assign(saveInfo, {copyTarget, re}));

        } else {
            if (copyTarget === 'masterTag') {
                // console.log(re.module,'id-2')
                return srcTarget;
            }
            saveInfo = {
                masterTarget: srcTarget,
                masterTargetId: srcTarget.id,
                copyTarget,
                re
            };
            map.set(srcTarget, saveInfo);
            map.set(copyTarget, saveInfo);

            saveInfo.re.$end.then(() => {
                /*事件调度系统*/
                eventDispatcher.processingArgumentsDorp(saveInfo, endModule);
            })
        }
    }

}

const cssMethods = new class {

    createMap(map) {
        return new Proxy(map, {
            get: (target, name) => {
                if (name === 'set' || name === 'delete') {
                    // console.log(name, 'name')
                    return (...arg) => {
                        const Ptag = arg[0];
                        if (name === 'set') {
                            this.addMasterTagClass(Ptag)
                        }
                        if (name === 'delete') {
                            this.delMasterTagClass(Ptag)
                        }
                        return target[name](...arg)
                    }
                }
                return target[name].bind(target)
            }
        })
    }


    changeMapSelectIndex(oldTarget, newTarget) {

        let o = new Set();
        oldTarget.forEach(x => {
            o.add(x['masterTarget'])
        });
        [...newTarget].map(x => {
            const tag = x[1]['masterTarget'];
            if (o.has(tag)) {
                o.delete(tag);
                return null;
            }
            return tag;
        }).filter(x => x).forEach(tag => {
            this.addMasterTagClass(tag)
        });
        o.forEach(tag => {
            this.delMasterTagClass(tag)
        })
    }

    async addMasterTagClass(target) {
        let classStyle = 'clickChangeColor';
        target.classList.add(classStyle)
    }

    async delMasterTagClass(target) {
        let classStyle = "clickChangeColor";
        target.classList.remove(classStyle);
    }

}

class analysisGlobal extends domMethods {
    static selectIndex = '0';

    dragover(e) {
        e.preventDefault();
    }

    setIndextabs(index) {
        analysisGlobal.selectIndex = index;
    }

    ondrag_start(e) {
        if (e.target.nodeName !== 'P') return null;

        let time = (new Date).getTime().toString();
        let clearId = setTimeout(() => {
            this.$root.$off(time)
        }, 10000);
        this.$root.$once(time, function (callback) {
            clearTimeout(clearId);
            callback(e.target);
        });
        e.dataTransfer.setData("time", time);
    }


    @getTimeResponse
    drop(e) {
        e.$getElement((el) => {
            e.target.appendChild(el);
        });
    }

    @getTimeResponse
    drop_dimension(re) {
        re.module = 'm1';
        re.$getElement((el) => {
            domMethods.createElement_P_Tag(el, re);
            let createTag = domMethods.saveLeftElementTag(re, el, 'masterTag');
            super.set_drop_dimension(re, createTag);
        });
    }

    @getTimeResponse
    drop_measure(re) {
        re.module = 'm2';
        re.$getElement((el) => {
            domMethods.createElement_P_Tag(el, re);
            let createTag = domMethods.saveLeftElementTag(re, el, 'masterTag');
            super.set_drop_measure(re, createTag);
        });
    }

    @getTimeResponse
    drop_left_screen(re) {
        re.module = 'm3';
        re.$getElement((el) => {
            let createTag = domMethods.createElement_P_Tag(el, re);
            domMethods.saveLeftElementTag(re, el, createTag);
            super.set_drop_screen_dom(re, createTag).catch((e) => {
                console.log(e)
            })
        })
    }

    @getTimeResponse
    drop_left_screen_tag(re) {
        re.module = 'm4';
        re.$getElement((el) => {
            let createTag = domMethods.createElement_P_Insert_I_tag(el, re);
            domMethods.saveLeftElementTag(re, el, createTag);
            super.set_drop_left_screen_tag_dom(re, createTag)
        })
    }

    @getTimeResponse
    drop_toolbar_dimension(re) {
        re.module = 'm5';
        re.$getElement((el) => {
            let createTag = domMethods.createElement_P_Tag(el, re);
            domMethods.saveLeftElementTag(re, el, createTag);
            super.set_drop_toolbar_dom(re, createTag);
        })
    }

    @getTimeResponse
    drop_toolbar_measure(re) {
        re.module = 'm6';
        re.$getElement((el) => {
            let createTag = domMethods.createElement_P_Tag(el, re);
            domMethods.saveLeftElementTag(re, el, createTag);
            super.set_drop_toolbar_dom(re, createTag);
        })
    }

}


export default function (indexThis) {
    storeWatcher.setStore(indexThis.$store);
    eventDispatcher.setVue(indexThis.$root);
    return new Proxy(new analysisGlobal, {
        get(target, name) {
            return typeof target[name] === 'function' ? target[name].bind(indexThis) : target[name]
        },
    })
}


function getTimeResponse(proto, name, descriptor) {
    let callback = descriptor.value;
    descriptor.value = function (e) {
        //e 拖动的目的元素;
        if (typeof e === 'string') return null;
        let response = {target: e.target};
        response.type = "drop";
        response.time = e.dataTransfer.getData('time');
        response.$end = new Promise((resolve) => {
            response.$getElement = (call) => {
                this.$root.$emit(response.time, (target) => {
                    call(target)
                });
                resolve();
            };
        });
        callback.call(this, response);
    }
}

