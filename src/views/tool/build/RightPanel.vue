<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">返回</el-button></div>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="缁勪欢灞炴€? name="field" />
      <el-tab-pane label="琛ㄥ崟灞炴€? name="form" />
    </el-tabs>
    <div class="field-box">
      <a class="document-link" target="_blank" :href="documentLink" title="鏌ョ湅缁勪欢鏂囨。">
        <i class="el-icon-link" />
      </a>
      <el-scrollbar class="right-scrollbar">
        <!-- 缁勪欢灞炴€?-->
        <el-form v-show="currentTab==='field' && showField" size="small" label-width="90px">
          <el-form-item v-if="activeData.changeTag" label="缁勪欢绫诲瀷">
            <el-select
              v-model="activeData.tagIcon"
              placeholder="璇烽€夋嫨缁勪欢绫诲瀷"
              :style="{width: '100%'}"
              @change="tagChange"
            >
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.tagIcon"
                >
                  <svg-icon class="node-icon" :icon-class="item.tagIcon" />
                  <span> {{ item.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.vModel!==undefined" label="瀛楁鍚?>
            <el-input v-model="activeData.vModel" placeholder="璇疯緭鍏ュ瓧娈靛悕锛坴-model锛? />
          </el-form-item>
          <el-form-item v-if="activeData.componentName!==undefined" label="缁勪欢鍚?>
            {{ activeData.componentName }}
          </el-form-item>
          <el-form-item v-if="activeData.label!==undefined" label="鏍囬">
            <el-input v-model="activeData.label" placeholder="璇疯緭鍏ユ爣棰? />
          </el-form-item>
          <el-form-item v-if="activeData.placeholder!==undefined" label="鍗犱綅鎻愮ず">
            <el-input v-model="activeData.placeholder" placeholder="璇疯緭鍏ュ崰浣嶆彁绀? />
          </el-form-item>
          <el-form-item v-if="activeData['start-placeholder']!==undefined" label="寮€濮嬪崰浣?>
            <el-input v-model="activeData['start-placeholder']" placeholder="璇疯緭鍏ュ崰浣嶆彁绀? />
          </el-form-item>
          <el-form-item v-if="activeData['end-placeholder']!==undefined" label="缁撴潫鍗犱綅">
            <el-input v-model="activeData['end-placeholder']" placeholder="璇疯緭鍏ュ崰浣嶆彁绀? />
          </el-form-item>
          <el-form-item v-if="activeData.span!==undefined" label="琛ㄥ崟鏍呮牸">
            <el-slider v-model="activeData.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange" />
          </el-form-item>
          <el-form-item v-if="activeData.layout==='rowFormItem'" label="鏍呮牸闂撮殧">
            <el-input-number v-model="activeData.gutter" :min="0" placeholder="鏍呮牸闂撮殧" />
          </el-form-item>
          <el-form-item v-if="activeData.layout==='rowFormItem'" label="甯冨眬妯″紡">
            <el-radio-group v-model="activeData.type">
              <el-radio-button label="default" />
              <el-radio-button label="flex" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.justify!==undefined&&activeData.type==='flex'" label="姘村钩鎺掑垪">
            <el-select v-model="activeData.justify" placeholder="璇烽€夋嫨姘村钩鎺掑垪" :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in justifyOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.align!==undefined&&activeData.type==='flex'" label="鍨傜洿鎺掑垪">
            <el-radio-group v-model="activeData.align">
              <el-radio-button label="top" />
              <el-radio-button label="middle" />
              <el-radio-button label="bottom" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.labelWidth!==undefined" label="鏍囩瀹藉害">
            <el-input v-model.number="activeData.labelWidth" type="number" placeholder="璇疯緭鍏ユ爣绛惧搴? />
          </el-form-item>
          <el-form-item v-if="activeData.style&&activeData.style.width!==undefined" label="缁勪欢瀹藉害">
            <el-input v-model="activeData.style.width" placeholder="璇疯緭鍏ョ粍浠跺搴? clearable />
          </el-form-item>
          <el-form-item v-if="activeData.vModel!==undefined" label="榛樿鍊?>
            <el-input
              :value="setDefaultValue(activeData.defaultValue)"
              placeholder="璇疯緭鍏ラ粯璁ゅ€?
              @input="onDefaultValueInput"
            />
          </el-form-item>
          <el-form-item v-if="activeData.tag==='el-checkbox-group'" label="鑷冲皯搴旈€?>
            <el-input-number
              :value="activeData.min"
              :min="0"
              placeholder="鑷冲皯搴旈€?
              @input="$set(activeData, 'min', $event?$event:undefined)"
            />
          </el-form-item>
          <el-form-item v-if="activeData.tag==='el-checkbox-group'" label="鏈€澶氬彲閫?>
            <el-input-number
              :value="activeData.max"
              :min="0"
              placeholder="鏈€澶氬彲閫?
              @input="$set(activeData, 'max', $event?$event:undefined)"
            />
          </el-form-item>
          <el-form-item v-if="activeData.prepend!==undefined" label="鍓嶇紑">
            <el-input v-model="activeData.prepend" placeholder="璇疯緭鍏ュ墠缂€" />
          </el-form-item>
          <el-form-item v-if="activeData.append!==undefined" label="鍚庣紑">
            <el-input v-model="activeData.append" placeholder="璇疯緭鍏ュ悗缂€" />
          </el-form-item>
          <el-form-item v-if="activeData['prefix-icon']!==undefined" label="鍓嶅浘鏍?>
            <el-input v-model="activeData['prefix-icon']" placeholder="璇疯緭鍏ュ墠鍥炬爣鍚嶇О">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">
                閫夋嫨
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['suffix-icon'] !== undefined" label="鍚庡浘鏍?>
            <el-input v-model="activeData['suffix-icon']" placeholder="璇疯緭鍏ュ悗鍥炬爣鍚嶇О">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">
                閫夋嫨
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-cascader'" label="閫夐」鍒嗛殧绗?>
            <el-input v-model="activeData.separator" placeholder="璇疯緭鍏ラ€夐」鍒嗛殧绗? />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="鏈€灏忚鏁?>
            <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="鏈€灏忚鏁? />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="鏈€澶ц鏁?>
            <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="鏈€澶ц鏁? />
          </el-form-item>
          <el-form-item v-if="activeData.min !== undefined" label="鏈€灏忓€?>
            <el-input-number v-model="activeData.min" placeholder="鏈€灏忓€? />
          </el-form-item>
          <el-form-item v-if="activeData.max !== undefined" label="鏈€澶у€?>
            <el-input-number v-model="activeData.max" placeholder="鏈€澶у€? />
          </el-form-item>
          <el-form-item v-if="activeData.step !== undefined" label="姝ラ暱">
            <el-input-number v-model="activeData.step" placeholder="姝ユ暟" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-input-number'" label="绮惧害">
            <el-input-number v-model="activeData.precision" :min="0" placeholder="绮惧害" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-input-number'" label="鎸夐挳浣嶇疆">
            <el-radio-group v-model="activeData['controls-position']">
              <el-radio-button label="">
                榛樿
              </el-radio-button>
              <el-radio-button label="right">
                鍙充晶
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.maxlength !== undefined" label="鏈€澶氳緭鍏?>
            <el-input v-model="activeData.maxlength" placeholder="璇疯緭鍏ュ瓧绗﹂暱搴?>
              <template slot="append">
                涓瓧绗?
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['active-text'] !== undefined" label="寮€鍚彁绀?>
            <el-input v-model="activeData['active-text']" placeholder="璇疯緭鍏ュ紑鍚彁绀? />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-text'] !== undefined" label="鍏抽棴鎻愮ず">
            <el-input v-model="activeData['inactive-text']" placeholder="璇疯緭鍏ュ叧闂彁绀? />
          </el-form-item>
          <el-form-item v-if="activeData['active-value'] !== undefined" label="寮€鍚€?>
            <el-input
              :value="setDefaultValue(activeData['active-value'])"
              placeholder="璇疯緭鍏ュ紑鍚€?
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-value'] !== undefined" label="鍏抽棴鍊?>
            <el-input
              :value="setDefaultValue(activeData['inactive-value'])"
              placeholder="璇疯緭鍏ュ叧闂€?
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData.type !== undefined && 'el-date-picker' === activeData.tag"
            label="鏃堕棿绫诲瀷"
          >
            <el-select
              v-model="activeData.type"
              placeholder="璇烽€夋嫨鏃堕棿绫诲瀷"
              :style="{ width: '100%' }"
              @change="dateTypeChange"
            >
              <el-option
                v-for="(item, index) in dateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.name !== undefined" label="鏂囦欢瀛楁鍚?>
            <el-input v-model="activeData.name" placeholder="璇疯緭鍏ヤ笂浼犳枃浠跺瓧娈靛悕" />
          </el-form-item>
          <el-form-item v-if="activeData.accept !== undefined" label="鏂囦欢绫诲瀷">
            <el-select
              v-model="activeData.accept"
              placeholder="璇烽€夋嫨鏂囦欢绫诲瀷"
              :style="{ width: '100%' }"
              clearable
            >
              <el-option label="鍥剧墖" value="image/*" />
              <el-option label="瑙嗛" value="video/*" />
              <el-option label="闊抽" value="audio/*" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.fileSize !== undefined" label="鏂囦欢澶у皬">
            <el-input v-model.number="activeData.fileSize" placeholder="璇疯緭鍏ユ枃浠跺ぇ灏?>
              <el-select slot="append" v-model="activeData.sizeUnit" :style="{ width: '66px' }">
                <el-option label="KB" value="KB" />
                <el-option label="MB" value="MB" />
                <el-option label="GB" value="GB" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.action !== undefined" label="涓婁紶鍦板潃">
            <el-input v-model="activeData.action" placeholder="璇疯緭鍏ヤ笂浼犲湴鍧€" clearable />
          </el-form-item>
          <el-form-item v-if="activeData['list-type'] !== undefined" label="鍒楄〃绫诲瀷">
            <el-radio-group v-model="activeData['list-type']" size="small">
              <el-radio-button label="text">
                text
              </el-radio-button>
              <el-radio-button label="picture">
                picture
              </el-radio-button>
              <el-radio-button label="picture-card">
                picture-card
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="activeData.buttonText !== undefined"
            v-show="'picture-card' !== activeData['list-type']"
            label="鎸夐挳鏂囧瓧"
          >
            <el-input v-model="activeData.buttonText" placeholder="璇疯緭鍏ユ寜閽枃瀛? />
          </el-form-item>
          <el-form-item v-if="activeData['range-separator'] !== undefined" label="鍒嗛殧绗?>
            <el-input v-model="activeData['range-separator']" placeholder="璇疯緭鍏ュ垎闅旂" />
          </el-form-item>
          <el-form-item v-if="activeData['picker-options'] !== undefined" label="鏃堕棿娈?>
            <el-input
              v-model="activeData['picker-options'].selectableRange"
              placeholder="璇疯緭鍏ユ椂闂存"
            />
          </el-form-item>
          <el-form-item v-if="activeData.format !== undefined" label="鏃堕棿鏍煎紡">
            <el-input
              :value="activeData.format"
              placeholder="璇疯緭鍏ユ椂闂存牸寮?
              @input="setTimeValue($event)"
            />
          </el-form-item>
          <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.tag) > -1">
            <el-divider>閫夐」</el-divider>
            <draggable
              :list="activeData.options"
              :animation="340"
              group="selectItem"
              handle=".option-drag"
            >
              <div v-for="(item, index) in activeData.options" :key="index" class="select-item">
                <div class="select-line-icon option-drag">
                  <i class="el-icon-s-operation" />
                </div>
                <el-input v-model="item.label" placeholder="閫夐」鍚? size="small" />
                <el-input
                  placeholder="閫夐」鍊?
                  size="small"
                  :value="item.value"
                  @input="setOptionValue(item, $event)"
                />
                <div class="close-btn select-line-icon" @click="activeData.options.splice(index, 1)">
                  <i class="el-icon-remove-outline" />
                </div>
              </div>
            </draggable>
            <div style="margin-left: 20px;">
              <el-button
                style="padding-bottom: 0"
                icon="el-icon-circle-plus-outline"
                type="text"
                @click="addSelectItem"
              >
                娣诲姞閫夐」
              </el-button>
            </div>
            <el-divider />
          </template>

          <template v-if="['el-cascader'].indexOf(activeData.tag) > -1">
            <el-divider>閫夐」</el-divider>
            <el-form-item label="鏁版嵁绫诲瀷">
              <el-radio-group v-model="activeData.dataType" size="small">
                <el-radio-button label="dynamic">
                  鍔ㄦ€佹暟鎹?
                </el-radio-button>
                <el-radio-button label="static">
                  闈欐€佹暟鎹?
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <template v-if="activeData.dataType === 'dynamic'">
              <el-form-item label="鏍囩閿悕">
                <el-input v-model="activeData.labelKey" placeholder="璇疯緭鍏ユ爣绛鹃敭鍚? />
              </el-form-item>
              <el-form-item label="鍊奸敭鍚?>
                <el-input v-model="activeData.valueKey" placeholder="璇疯緭鍏ュ€奸敭鍚? />
              </el-form-item>
              <el-form-item label="瀛愮骇閿悕">
                <el-input v-model="activeData.childrenKey" placeholder="璇疯緭鍏ュ瓙绾ч敭鍚? />
              </el-form-item>
            </template>

            <el-tree
              v-if="activeData.dataType === 'static'"
              draggable
              :data="activeData.options"
              node-key="id"
              :expand-on-click-node="false"
              :render-content="renderContent"
            />
            <div v-if="activeData.dataType === 'static'" style="margin-left: 20px">
              <el-button
                style="padding-bottom: 0"
                icon="el-icon-circle-plus-outline"
                type="text"
                @click="addTreeItem"
              >
                娣诲姞鐖剁骇
              </el-button>
            </div>
            <el-divider />
          </template>

          <el-form-item v-if="activeData.optionType !== undefined" label="閫夐」鏍峰紡">
            <el-radio-group v-model="activeData.optionType">
              <el-radio-button label="default">
                榛樿
              </el-radio-button>
              <el-radio-button label="button">
                鎸夐挳
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData['active-color'] !== undefined" label="寮€鍚鑹?>
            <el-color-picker v-model="activeData['active-color']" />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-color'] !== undefined" label="鍏抽棴棰滆壊">
            <el-color-picker v-model="activeData['inactive-color']" />
          </el-form-item>

          <el-form-item v-if="activeData['allow-half'] !== undefined" label="鍏佽鍗婇€?>
            <el-switch v-model="activeData['allow-half']" />
          </el-form-item>
          <el-form-item v-if="activeData['show-text'] !== undefined" label="杈呭姪鏂囧瓧">
            <el-switch v-model="activeData['show-text']" @change="rateTextChange" />
          </el-form-item>
          <el-form-item v-if="activeData['show-score'] !== undefined" label="鏄剧ず鍒嗘暟">
            <el-switch v-model="activeData['show-score']" @change="rateScoreChange" />
          </el-form-item>
          <el-form-item v-if="activeData['show-stops'] !== undefined" label="鏄剧ず闂存柇鐐?>
            <el-switch v-model="activeData['show-stops']" />
          </el-form-item>
          <el-form-item v-if="activeData.range !== undefined" label="鑼冨洿閫夋嫨">
            <el-switch v-model="activeData.range" @change="rangeChange" />
          </el-form-item>
          <el-form-item
            v-if="activeData.border !== undefined && activeData.optionType === 'default'"
            label="鏄惁甯﹁竟妗?
          >
            <el-switch v-model="activeData.border" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-color-picker'" label="棰滆壊鏍煎紡">
            <el-select
              v-model="activeData['color-format']"
              placeholder="璇烽€夋嫨棰滆壊鏍煎紡"
              :style="{ width: '100%' }"
              @change="colorFormatChange"
            >
              <el-option
                v-for="(item, index) in colorFormatOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="activeData.size !== undefined &&
              (activeData.optionType === 'button' ||
                activeData.border ||
                activeData.tag === 'el-color-picker')"
            label="閫夐」灏哄"
          >
            <el-radio-group v-model="activeData.size">
              <el-radio-button label="medium">
                涓瓑
              </el-radio-button>
              <el-radio-button label="small">
                杈冨皬
              </el-radio-button>
              <el-radio-button label="mini">
                杩蜂綘
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData['show-word-limit'] !== undefined" label="杈撳叆缁熻">
            <el-switch v-model="activeData['show-word-limit']" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-input-number'" label="涓ユ牸姝ユ暟">
            <el-switch v-model="activeData['step-strictly']" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-cascader'" label="鏄惁澶氶€?>
            <el-switch v-model="activeData.props.props.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-cascader'" label="灞曠ず鍏ㄨ矾寰?>
            <el-switch v-model="activeData['show-all-levels']" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-cascader'" label="鍙惁绛涢€?>
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.clearable !== undefined" label="鑳藉惁娓呯┖">
            <el-switch v-model="activeData.clearable" />
          </el-form-item>
          <el-form-item v-if="activeData.showTip !== undefined" label="鏄剧ず鎻愮ず">
            <el-switch v-model="activeData.showTip" />
          </el-form-item>
          <el-form-item v-if="activeData.multiple !== undefined" label="澶氶€夋枃浠?>
            <el-switch v-model="activeData.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData['auto-upload'] !== undefined" label="鑷姩涓婁紶">
            <el-switch v-model="activeData['auto-upload']" />
          </el-form-item>
          <el-form-item v-if="activeData.readonly !== undefined" label="鏄惁鍙">
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          <el-form-item v-if="activeData.disabled !== undefined" label="鏄惁绂佺敤">
            <el-switch v-model="activeData.disabled" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-select'" label="鏄惁鍙悳绱?>
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.tag === 'el-select'" label="鏄惁澶氶€?>
            <el-switch v-model="activeData.multiple" @change="multipleChange" />
          </el-form-item>
          <el-form-item v-if="activeData.required !== undefined" label="鏄惁蹇呭～">
            <el-switch v-model="activeData.required" />
          </el-form-item>

          <template v-if="activeData.layoutTree">
            <el-divider>甯冨眬缁撴瀯鏍?/el-divider>
            <el-tree
              :data="[activeData]"
              :props="layoutTreeProps"
              node-key="renderKey"
              default-expand-all
              draggable
            >
              <span slot-scope="{ node, data }">
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.tagIcon" />
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </template>

          <template v-if="activeData.layout === 'colFormItem' && activeData.tag !== 'el-button'">
            <el-divider>姝ｅ垯鏍￠獙</el-divider>
            <div
              v-for="(item, index) in activeData.regList"
              :key="index"
              class="reg-item"
            >
              <span class="close-btn" @click="activeData.regList.splice(index, 1)">
                <i class="el-icon-close" />
              </span>
              <el-form-item label="琛ㄨ揪寮?>
                <el-input v-model="item.pattern" placeholder="璇疯緭鍏ユ鍒? />
              </el-form-item>
              <el-form-item label="閿欒鎻愮ず" style="margin-bottom:0">
                <el-input v-model="item.message" placeholder="璇疯緭鍏ラ敊璇彁绀? />
              </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                娣诲姞瑙勫垯
              </el-button>
            </div>
          </template>
        </el-form>
        <!-- 琛ㄥ崟灞炴€?-->
        <el-form v-show="currentTab === 'form'" size="small" label-width="90px">
          <el-form-item label="琛ㄥ崟鍚?>
            <el-input v-model="formConf.formRef" placeholder="璇疯緭鍏ヨ〃鍗曞悕锛坮ef锛? />
          </el-form-item>
          <el-form-item label="琛ㄥ崟妯″瀷">
            <el-input v-model="formConf.formModel" placeholder="璇疯緭鍏ユ暟鎹ā鍨? />
          </el-form-item>
          <el-form-item label="鏍￠獙妯″瀷">
            <el-input v-model="formConf.formRules" placeholder="璇疯緭鍏ユ牎楠屾ā鍨? />
          </el-form-item>
          <el-form-item label="琛ㄥ崟灏哄">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="medium">
                涓瓑
              </el-radio-button>
              <el-radio-button label="small">
                杈冨皬
              </el-radio-button>
              <el-radio-button label="mini">
                杩蜂綘
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="鏍囩瀵归綈">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">
                宸﹀榻?
              </el-radio-button>
              <el-radio-button label="right">
                鍙冲榻?
              </el-radio-button>
              <el-radio-button label="top">
                椤堕儴瀵归綈
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="鏍囩瀹藉害">
            <el-input-number v-model="formConf.labelWidth" placeholder="鏍囩瀹藉害" />
          </el-form-item>
          <el-form-item label="鏍呮牸闂撮殧">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="鏍呮牸闂撮殧" />
          </el-form-item>
          <el-form-item label="绂佺敤琛ㄥ崟">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
          <el-form-item label="琛ㄥ崟鎸夐挳">
            <el-switch v-model="formConf.formBtns" />
          </el-form-item>
          <el-form-item label="鏄剧ず鏈€変腑缁勪欢杈规">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

    <treeNode-dialog :visible.sync="dialogVisible" title="娣诲姞閫夐」" @commit="addNode" />
    <icons-dialog :visible.sync="iconsVisible" :current="activeData[currentIconModel]" @select="setIcon" />
  </div>
</template>

<script>
import { isArray } from 'util'
import draggable from 'vuedraggable'
import TreeNodeDialog from './TreeNodeDialog'
import { isNumberStr } from '@/utils/index'
import IconsDialog from './IconsDialog'
import {
  inputComponents,
  selectComponents,
  layoutComponents
} from '@/utils/generator/config'

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 绗?WW 鍛?,
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

export default {
  components: {
    draggable,
    TreeNodeDialog,
    IconsDialog
  },
  props: ['showField', 'activeData', 'formConf'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: '鏃?date)',
          value: 'date'
        },
        {
          label: '鍛?week)',
          value: 'week'
        },
        {
          label: '鏈?month)',
          value: 'month'
        },
        {
          label: '骞?year)',
          value: 'year'
        },
        {
          label: '鏃ユ湡鏃堕棿(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '鏃ユ湡鑼冨洿(daterange)',
          value: 'daterange'
        },
        {
          label: '鏈堣寖鍥?monthrange)',
          value: 'monthrange'
        },
        {
          label: '鏃ユ湡鏃堕棿鑼冨洿(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          return data.componentName || `${data.label}: ${data.vModel}`
        }
      }
    }
  },
  computed: {
    documentLink() {
      return (
        this.activeData.document
        || 'https://element.eleme.cn/#/zh-CN/component/installation'
      )
    },
    dateOptions() {
      if (
        this.activeData.type !== undefined
        && this.activeData.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },
    tagList() {
      return [
        {
          label: '杈撳叆鍨嬬粍浠?,
          options: inputComponents
        },
        {
          label: '閫夋嫨鍨嬬粍浠?,
          options: selectComponents
        }
      ]
    }
  },
  methods: {
    addReg() {
      this.activeData.regList.push({
        pattern: '',
        message: ''
      })
    },
    addSelectItem() {
      this.activeData.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="娣诲姞"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="鍒犻櫎"
            ></i>
          </span>
        </div>
      )
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      if (['string', 'number'].indexOf(val) > -1) {
        return val
      }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.defaultValue)) {
        // 鏁扮粍
        this.$set(
          this.activeData,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 甯冨皵
        this.$set(this.activeData, 'defaultValue', JSON.parse(str))
      } else {
        // 瀛楃涓插拰鏁板瓧
        this.$set(
          this.activeData,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    spanChange(val) {
      this.formConf.span = val
    },
    multipleChange(val) {
      this.$set(this.activeData, 'defaultValue', val ? [] : '')
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange(val) {
      this.$set(
        this.activeData,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange(val) {
      this.activeData.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.renderKey = +new Date() // 鏇存柊renderKey,閲嶆柊娓叉煋璇ョ粍浠?
    },
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val
    },
    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.tagIcon === tagIcon)
      if (!target) target = selectComponents.find(item => item.tagIcon === tagIcon)
      this.$emit('tag-change', target)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label{
  font-size: 14px;
}
.node-icon{
  color: #bebfc3;
}
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


